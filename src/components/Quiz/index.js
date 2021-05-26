import React, {useEffect, useState} from 'react';
import API from '../../api';
import {Text} from 'react-native';

const QuizCategories = () => {
  const [questions, setQuestions] = useState([]);
  const fetchQuizCategories = async () => {
    const config = {
      header: {
        'Content-Type': 'application/json',
      },
    };
    const {data} = await API.get('quiz/questions', config);
    const formattedData = data.map(question => {
      const incorrectAnswersIndexes = question.incorrect_answers.length;
      const randomIndex = Math.random() * (incorrectAnswersIndexes - 0) + 0;
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
    setQuestions(formattedData);
  };

  useEffect(() => {
    fetchQuizCategories();
  }, []);

  console.log(questions);
  return <Text>Hello from Quiz Categories!</Text>;
};

export default QuizCategories;
