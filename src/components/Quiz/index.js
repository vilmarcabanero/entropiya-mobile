import React, {useEffect, useState} from 'react';
import API from '../../api';
import * as S from './styles';
import axios from 'axios';

const Index = () => {
  const [chapter, setChapter] = useState(151);
  const [quizNumber, setQuizNumber] = useState(null);
  const [difficulty, setDifficulty] = useState(1);
  const [quizData, setQuizData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState(
    // 'https://hn.algolia.com/api/v1/search?query=redux',
    `https://entropiya-api.herokuapp.com/api/quiz/questions?amount=3&chapter=${chapter}&difficulty=1`,
  );
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios(url);

        setQuizData(result.data);
        console.log(result.data);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };
    fetchData();
  }, [url]);

  const fetchQuizData = async () => {
    try {
      const url1 = `quiz/questions?amount=${quizNumber}&chapter=${chapter}&difficulty=${difficulty}`;
      const {data} = await API.get(url1);

      const formattedData = data.map(q => {
        const incorrectAnswersIndexes = q.incorrect_answers.length;
        const randomIndex = Math.round(
          Math.random() * (incorrectAnswersIndexes - 0) + 0,
        );

        q.incorrect_answers.splice(randomIndex, 0, q.correct_answer);

        return {
          ...q,
          answers: q.incorrect_answers,
        };
      });

      console.log('Line 32, res.data.length: ', data.length);

      setQuizData(formattedData);
      console.log('Line 32, quizData.length: ', quizData.length);
    } catch (error) {
      console.log('Fetch quiz error =====>>>>', error);
    }
  };

  // useEffect(fetchQuizData(), []);

  const submitHandler = () => {
    console.log('First', quizData.length !== 0, quizNumber !== null);
    fetchQuizData();
    fetchData();
    console.log('Second', quizData.length !== 0, quizNumber !== null);

    // if (quizData.length !== 0 && quizNumber !== null) {
    //   fetchQuizData();
    //   console.log('Test started!');
    //   console.log('quizData.length: ', quizData.length);
    // }
  };

  // Question: ${quizData[0].question}
  const chapterChangeHandler = (itemValue, itemIndex) => {
    setChapter(itemValue);
  };

  const difficultyChangeHandler = (itemValue, itemIndex) => {
    setDifficulty(itemValue);
  };

  const quizNumberChangeHandler = (itemValue, itemIndex) => {
    setQuizNumber(itemValue);
  };

  if (isLoading) {
    return (
      <S.Container>
        <S.Title>Loading...</S.Title>
      </S.Container>
    );
  }

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
    Test started!
    `}</S.Label>
      </S.PickerContainer>
    </S.Container>
  );
};

export default Index;

// const formattedData = data.map(question => {
//   const incorrectAnswersIndexes = question.incorrect_answers.length;
//   const randomIndex = Math.round(
//     Math.random() * (incorrectAnswersIndexes - 0) + 0,
//   );
//   question.incorrect_answers.splice(
//     randomIndex,
//     0,
//     question.correct_answer,
//   );
//   return {
//     ...question,
//     answers: question.incorrect_answers,
//   };
// });
