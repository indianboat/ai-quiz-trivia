"use client";

import NotFound from "@/app/components/NotFound/NotFound";
import { useTriviaQuiz } from "@/store/quiz";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Righteous } from "next/font/google";
import CustomButton from "@/app/components/ui/Button/CustomButton";
import FullPageSpinner from "@/app/components/Loading/FullPageSpinner";

const righteous = Righteous({ subsets: ["latin"], weight: "400" })

const QuizPage = ({ params }) => {

  const [loadingData, setLoadingData] = useState(true);
  const { topic } = params;
  const router = useRouter();
  const questionNumber = useSearchParams().get("q");
  const questionIndex = parseInt(questionNumber) - 1 || 0;

  const { quizData, getQuizData } = useTriviaQuiz(); // global quiz data state

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(questionIndex); // current question on screen
  const [isQuestionSolved, setIsQuestionSolved] = useState(false); // checking if question is solved or not
  const [selectedOption, setSelectedOption] = useState("");
  const [quizFinished, setQuizFinished] = useState(false); // is quiz finished or not, also saving in local storage

  const [correctAnswer, setCorrectAnswer] = useState(""); // correct answer for current question

  useEffect(() => {

    getQuizData();
    setLoadingData(false);

    if (!loadingData && (quizData === null || quizData.length === 0)) {
      router.push("/")
      toast.error("No Data Available");
    }

    else if (currentQuestionIndex <= quizData.length - 1) {

      const questionSolved = localStorage.getItem(`question_${currentQuestionIndex}_solved`);
      const selectedOptionforQuestion = localStorage.getItem(`selected_option_for_${currentQuestionIndex}`);
      const correctOpt = quizData[currentQuestionIndex]?.correctOption;
      const quiz_finished = localStorage.getItem(`quiz_finished`);

      setQuizFinished(quiz_finished === "true" || false);
      setIsQuestionSolved(questionSolved === "true" || questionSolved === true);
      setSelectedOption(selectedOptionforQuestion);
      setCorrectAnswer(correctOpt);
    }

  }, [currentQuestionIndex, loadingData]);

  const handleOptionSelect = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmitQuestion = () => {
    if (selectedOption === "" || selectedOption === null) {
      toast.error("Please select any option");
    }
    else if (currentQuestionIndex <= (quizData.length - 1)) {

      const correctOption = quizData[currentQuestionIndex]?.correctOption;
      setCorrectAnswer(correctOption);

      setIsQuestionSolved(true);
      localStorage.setItem(`question_${currentQuestionIndex}_solved`, "true");
      localStorage.setItem(`selected_option_for_${currentQuestionIndex}`, selectedOption);

      if (selectedOption === correctOption) {
        const correctAnswers = parseInt(localStorage.getItem('correct_answers')) || 0;
        localStorage.setItem(`correct_answers`, correctAnswers + 1);
        toast.success("Hurray! correct answer");
      }
      else {
        toast.error("Oh no! wrong answer");
      }

      if (currentQuestionIndex === quizData?.length - 1) {
        setQuizFinished(true);
        localStorage.setItem("quiz_finished", true);
        router.push(`/quiz/finish`);

        setTimeout(() => {
          localStorage.removeItem("quiz");
          for (let i = 0; i < 20; i++) {
            localStorage.removeItem(`question_${i}_solved`);
            localStorage.removeItem(`selected_option_for_${i}`);
          }
        }, 2000);
      }
    }
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    router.push(`/quiz/${topic}?q=${currentQuestionIndex + 2}`);
  };

  const handleBackQuestion = () => {
    if (currentQuestionIndex <= quizData?.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
      router.push(`/quiz/${topic}?q=${currentQuestionIndex}`);
    }
    else if (currentQuestionIndex > 20) {
      router.push(`/quiz/finish`);
    }
  };

  return (
    <>
      {
        loadingData ? <FullPageSpinner /> : quizData !== null && quizData?.length > 0 && !quizFinished ?
          <div className="flex md:p-6 p-2 py-6 justify-center w-full">
            <div className="flex flex-col justify-center md:p-10 p-4 lg:w-10/12 md:w-10/12 sm:w-11/12 w-full bg-lime-100 rounded-3xl shadow-md shadow-lime-200 relative overflow-hidden">
              {
                isQuestionSolved ? <span className="absolute select-none bg-green-500 text-green-950 top-5 -right-8 px-10 rotate-45">Done</span> : <span className="absolute select-none bg-yellow-400 text-yellow-950 top-5 -right-8 px-8 rotate-45">Pending</span>
              }
              <p className={`mb-4 lg:text-4xl md:text-4xl sm:text-3xl text-2xl p-6 w-full text-center rounded-tl-[60px] rounded-br-[100px] rounded-bl-3xl rounded-tr-3xl bg-lime-600 text-white shadow-2xl select-none ${righteous.className}`}>Q{currentQuestionIndex + 1}. {quizData[currentQuestionIndex]?.question}</p>
              <ul className="mb-4 grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 md:gap-6 gap-4 w-full mt-6">
                {quizData[currentQuestionIndex]?.options?.map((option, index) => {
                  let optionClassName = "";
                  if (isQuestionSolved) {
                    if (option === correctAnswer) {
                      optionClassName = "bg-lime-700 text-white"
                    }
                    else if (option === selectedOption) {
                      optionClassName = "bg-red-500 text-white border-red-500 hover:border-red-500"
                    }
                  }

                  return (
                    <li key={index} className="flex w-full">
                      <input
                        type="radio"
                        name="options"
                        value={option}
                        id={index}
                        checked={selectedOption === option}
                        onChange={handleOptionSelect}
                        disabled={isQuestionSolved}
                        className="sr-only"
                      />
                      <label className={`${optionClassName} ${selectedOption === option ? "bg-lime-800 text-white border-lime-800" : ""} border-2 w-full px-6 py-3 cursor-pointer rounded-tl-3xl rounded-br-3xl rounded-bl-xl rounded-tr-xl text-xl  transition-all shadow-lg ${righteous.className} checked:bg-lime-800 disabled:checked:bg-lime-800 select-none ${isQuestionSolved ? "border-lime-500 hover:border-lime-500" : "border-lime-500 hover:border-lime-800"}  flex items-center justify-between`} htmlFor={index}>
                        <span>{option}</span>
                        {
                          isQuestionSolved && selectedOption === option && option !== correctAnswer && <span>&#128531;</span>
                        }
                        {
                          isQuestionSolved && selectedOption === option && option === correctAnswer && <span>&#128512;</span>
                        }
                      </label>
                    </li>
                  )
                })}
              </ul>
              <div className="grid lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-3 grid-cols-1 gap-6 w-full mt-6">

                <CustomButton className="col-span-1" onClick={handleBackQuestion} type="button" disabled={currentQuestionIndex == 0 ? true : false} buttonName="Back" />
                <CustomButton className="md:col-span-2 col-span-1 w-full bg-green-500 submit-btn" onClick={handleSubmitQuestion} type="button" disabled={isQuestionSolved} buttonName="Submit" />
                <CustomButton className="col-span-1" onClick={handleNextQuestion} type="button" disabled={!isQuestionSolved} buttonName="Next" />

              </div>
            </div>
          </div> : <NotFound />
      }
    </>
  );
};

export default QuizPage;