import React, {useEffect, useState} from 'react';
import API from '../../api';
import * as S from './styles';

const Index = () => {
  const [chapter, setChapter] = useState(151);

  const [quizNumber, setQuizNumber] = useState(null);
  const [difficulty, setDifficulty] = useState(1);

  const [quizData, setQuizData] = useState([]);

  const [currentQuizStep, setCurrentQuizStep] = useState('start');

  const fetchQuizData = async () => {
    try {
      const url = `quiz/questions?amount=${quizNumber}&chapter=${chapter}&difficulty=${difficulty}`;

      const {data} = await API.get(url);

      const formattedCategory = data.map(question => {
        const incorrectAnswersIndexes = question.incorrect_answers.length;
        const randomIndex = Math.round(
          Math.random() * (incorrectAnswersIndexes - 0) + 0,
        );
        question.incorrect_answers.splice(
          randomIndex,
          0,
          question.correct_answer,
        );
        return {
          ...question,
          answers: question.incorrect_answers,
        };
      });
      setQuizData(formattedCategory);
      setCurrentQuizStep('results');
    } catch (error) {
      console.log('Fetch quiz error =====>>>>>', error);
    }
  };

  useEffect(() => {
    fetchQuizData();
  }, []);

  const submitHandler = () => {
    fetchQuizData();
    alert(`
    Difficulty: ${difficulty},
    Quiz Number: ${quizNumber},
    Chapter: ${chapter}
    Question: ${quizData[0].question}
    Test started!
    `);
    console.log(quizData);
    console.log(`
    Difficulty: ${difficulty},
    Quiz Number: ${quizNumber},
    Chapter: ${chapter}

    Test started!
    `);
  };

  const chapterChangeHandler = (itemValue, itemIndex) => {
    setChapter(itemValue);
  };

  const difficultyChangeHandler = (itemValue, itemIndex) => {
    setDifficulty(itemValue);
  };

  const quizNumberChangeHandler = (itemValue, itemIndex) => {
    setQuizNumber(itemValue);
  };

  return (
    <S.Container>
      <S.Title>Engineering Economy</S.Title>
      <S.PickerContainer>
        <S.Label>Select topic</S.Label>
        <S.StyledPicker
          selectedValue={chapter}
          onValueChange={chapterChangeHandler}>
          <S.StyledPicker.Item label="1. Present Economy" value={151} />
          <S.StyledPicker.Item
            label="2. Simple Interest and Discount"
            value={152}
          />
          <S.StyledPicker.Item label="3. Compound Interest" value={153} />
          <S.StyledPicker.Item label="4. Annuity" value={154} />
        </S.StyledPicker>
      </S.PickerContainer>

      <S.PickerContainer>
        <S.Label>Select difficulty</S.Label>
        <S.StyledPicker
          selectedValue={difficulty}
          onValueChange={difficultyChangeHandler}>
          <S.StyledPicker.Item label="Easy" value={1} />
          <S.StyledPicker.Item label="Average" value={2} />
          <S.StyledPicker.Item label="Difficult" value={3} />
        </S.StyledPicker>
      </S.PickerContainer>

      <S.PickerContainer>
        <S.Label>Input number of questions</S.Label>
        <S.Input
          onChangeText={quizNumberChangeHandler}
          value={quizNumber}
          placeholder="No. of questions"
          keyboardType="numeric"
        />
      </S.PickerContainer>
      <S.PickerContainer>
        <S.SubmitButton onPress={submitHandler} title="Start test" />
      </S.PickerContainer>

      <S.PickerContainer>
        <S.Label>{`
    Difficulty: ${difficulty},
    Quiz Number: ${quizNumber},
    Chapter: ${chapter}
    Question: ${quizData[0].question}
    Test started!
    `}</S.Label>
      </S.PickerContainer>
    </S.Container>
  );
};

export default Index;
