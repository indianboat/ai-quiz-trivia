"use client";

// import { generateTrivia } from '@/actions/generateTrivia';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'sonner';
import Spinner from '../Loading/Spinner';
import { Design1, Design2, SearchIcon } from '../Svg/Icons';
import { useTriviaQuiz } from '@/store/quiz';
import { count } from '@/utils/constant';

const SearchBar = () => {

  const router = useRouter();
  const [searchTopic, setSearchTopic] = useState("");
  const [quizLoading, setQuizLoading] = useState(false);

  const { setQuizData } = useTriviaQuiz();

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    setQuizLoading(true);
    // const res = await generateTrivia(searchTopic, 20);
    const res = await fetch(`/api/generate-quiz`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ topic: searchTopic, count })
    });

    const data = await res.json();
    setQuizLoading(false);

    if (res.ok || data.success) {
      toast.success("Quiz Generated")
      setQuizData(data.data.quiz);
      router.push(`/quiz/${searchTopic.replaceAll(" ", "-")}?q=${1}`);
    }
    else {
      toast.error(data.message);
    }
  }

  return (
    <>
      <div className="relative flex py-8 px-4 z-40">
        <div className="w-full mx-auto">
          <div className="text-center">
            <h1 className="md:text-3xl text-2xl font-bold text-gray-800 dark:text-neutral-200">
              Search any TOPIC
            </h1>
            <p className="mt-3 text-gray-600 dark:text-neutral-400">
              Stay in the know with insights from industry experts.
            </p>
            <div className="mt-7 sm:mt-12 mx-auto max-w-xl relative">

              <form onSubmit={handleFormSubmit}>
                <div className="relative z-10 flex space-x-3 p-3 bg-white border rounded-2xl shadow-lg shadow-gray-100 dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-gray-900/20">
                  <div className="flex-[1_0_0%]">
                    <label
                      htmlFor="search-topic"
                      className="block text-sm text-gray-700 font-medium dark:text-white"
                    >
                      <span className="sr-only">Search any topic...</span>
                    </label>
                    <input
                      type="text"
                      name="search-topic"
                      id="search-topic"
                      value={searchTopic}
                      className="py-2.5 px-4 outline-none border-2 border-neutral-200 block w-full border-transparent rounded-xl  dark:bg-neutral-900 dark:border-transparent dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 transition-all"
                      placeholder="Search any topic..."
                      minLength={2}
                      required
                      onChange={(event) => setSearchTopic(event.target.value)}
                    />
                  </div>
                  <div className="flex-[0_0_auto]">
                    <button
                      type="submit"
                      disabled={quizLoading}
                      className="size-[46px] md:w-20 w-12 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-xl border border-transparent bg-lime-600 text-white hover:bg-lime-700 disabled:opacity-50 disabled:pointer-events-none transition-all"
                    >
                      {
                        quizLoading ? <Spinner /> : <SearchIcon />
                      }
                    </button>
                  </div>
                </div>
              </form>
              <div className="hidden md:block absolute top-0 end-0 -translate-y-12 translate-x-20">
                <Design1 />
              </div>
              <div className="hidden md:block absolute bottom-0 start-0 translate-y-10 -translate-x-32">
                <Design2 />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SearchBar