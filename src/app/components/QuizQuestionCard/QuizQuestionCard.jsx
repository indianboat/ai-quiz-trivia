"use client";

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const QuizQuestionCard = ({ quiz, index, currentQuestionIndex, setCurrentQuestionIndex, topic }) => {

  const router = useRouter()

  const [nextButtonDisabled, setNextButtonDisabled] = useState(true);
  const [result, setResult] = useState("");

  const correctOption = quiz?.correctOption;
  // console.log(quiz);

  const radioInputs = document.querySelectorAll('input[type="radio"]');

  const handleSelectOption = (event) => {

    const isCorrect = event.target.value === correctOption
    setResult(isCorrect ? "Correct Answer" : `Wrong Answer, correct answer is: ${correctOption}`);

    radioInputs.forEach(input => {
      input.disabled = true;
    });

    setNextButtonDisabled(false);
  }

  const handleNextQuestion = () => {
    if (index !== 19) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      radioInputs.forEach(input => {
        input.disabled = false;
        input.checked = false;
      });
      setNextButtonDisabled(true);
      setResult('');
      // console.log(currentQuestionIndex);
      router.push(`/quiz/${topic.replaceAll(" ", "-")}?q=${(currentQuestionIndex + 1) + 1}`)
    }
    else {
      router.push("/")
    }
  }

  return (
    <>
      <div className=" max-w-3xl mx-auto">
        <h1 className='text-center'>Question No : {index + 1} out of 20</h1>

        <div className="flex flex-col gap-4">
          <h1 className='text-3xl text-center leading-normal bg-gradient-to-tl from-[#290355] to-[#E351CE] rounded-br-[80px] rounded-tl-[60px] md:p-12 p-6 text-white'>
            {quiz?.question}
          </h1>

          <ul className="grid md:grid-cols-2 grid-cols-1 md:gap-8 gap-4 mt-6 text-center">
            {
              quiz?.options.map((option, index) => {
                return (
                  <li key={index}>
                    <label
                      htmlFor={index}
                      className="flex p-6 w-full bg-white border-2 border-gray-200 rounded-tl-[30px] rounded-br-[30px] text-sm focus:border-blue-500 focus:ring-blue-500 cursor-pointer dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400"
                    >
                      <input
                        type="radio"
                        name="options"
                        value={option}
                        className="shrink-0 mt-0.5 border-gray-200  rounded-full text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                        onChange={handleSelectOption}
                        id={index}
                      />
                      <span className="text-sm text-gray-700 ms-3 dark:text-neutral-400 select-none">
                        {option}
                      </span>
                    </label>
                  </li>
                )
              })
            }
          </ul>

          {
            result !== "" ? result : null
          }

          <div className="flex justify-end">
            <button onClick={handleNextQuestion} disabled={nextButtonDisabled} type="button" className="py-2 px-3 mt-4 w-fit inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent disabled:cursor-not-allowed bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default QuizQuestionCard