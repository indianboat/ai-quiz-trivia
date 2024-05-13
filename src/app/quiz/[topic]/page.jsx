"use client";

import QuizQuestionCard from '@/app/components/QuizQuestionCard/QuizQuestionCard';
import { useTriviaQuiz } from '@/store/quiz';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const SearchTopicQuizPage = ({ params }) => {

  const { topic } = params;
  const questionNumber = useSearchParams().get("q");

  const { quizData, setQuizData } = useTriviaQuiz();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(questionNumber - 1);

  const currentQuestion = quizData[currentQuestionIndex];

  useEffect(() => {
    const quizQuestions = localStorage.getItem("quiz");
    if (quizQuestions) {
      setQuizData(JSON.parse(quizQuestions));
    }
  }, []);


  return (
    <>
      <div className='mx-auto container py-8 px-6 mt-2'>
        <QuizQuestionCard topic={topic} quiz={currentQuestion} index={currentQuestionIndex} currentQuestionIndex={currentQuestionIndex} setCurrentQuestionIndex={setCurrentQuestionIndex} />
      </div>
    </>
  )
}

export default SearchTopicQuizPage