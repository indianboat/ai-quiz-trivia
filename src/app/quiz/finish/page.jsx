"use client";

import FullPageSpinner from '@/app/components/Loading/FullPageSpinner';
import NotFound from '@/app/components/NotFound/NotFound';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import RealisticConfetti from "react-canvas-confetti/dist/presets/realistic";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const QuizFinished = () => {

  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [totalCorrectAnswers, setTotalCorrectAnswers] = useState(0);

  useEffect(() => {
    const quizFinished = localStorage.getItem("quiz_finished");
    const correctAnswers = localStorage.getItem("correct_answers");
    setTotalCorrectAnswers(Number(correctAnswers))
    const score = (correctAnswers / 20) * 100;

    setScore(score);

    if (quizFinished) {
      setIsQuizFinished(true);
    }
    setLoading(false)
  }, []);

  const handleRemoveData = () => {
    localStorage.removeItem("quiz_finished");
    localStorage.removeItem("correct_answers");
  }

  return (
    <>
      {
        loading ? <FullPageSpinner /> : !loading && !isQuizFinished ? <NotFound /> : <>
          <div className="p-10 container mx-auto text-2xl font-bold flex justify-center flex-col items-center gap-6">
            <CircularProgressbar value={score} text={`${score}%`} className="w-32 h-32" minValue={0} styles={buildStyles({ textColor: "white", backgroundColor: "#659614", pathColor: "white", trailColor: "transparent" })} background backgroundPadding={5} />
            <div className="flex flex-col">
              <span className='font-light'>Your score is: <span className="font-medium">{score}%</span> out of 100%</span>
              <span className='font-light'>Correct Answers: <span className="font-medium">{totalCorrectAnswers}</span> out of 20</span>
            </div>
          </div>

          <RealisticConfetti autorun={{ speed: 0.05, duration: 3000 }} />

          <div className="flex justify-center items-center">
            <Link
              onClick={handleRemoveData}
              className="w-full sm:w-auto py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-lime-600 text-white hover:bg-lime-700 disabled:opacity-50 disabled:pointer-events-none"
              href="/"
            >
              <svg
                className="flex-shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
              Back to home
            </Link>
          </div>

        </>
      }
    </>
  )
}

export default QuizFinished