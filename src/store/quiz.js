import { create } from "zustand";

const useTriviaQuiz = create((set) => ({
  quizData: [],
  getQuizData: () => {
    const quiz = localStorage.getItem("quiz");
    set({ quizData: JSON.parse(quiz) });
  },
  setQuizData: (data) => {
    localStorage.setItem("quiz", JSON.stringify(data));
    set({ quizData: data });
  },
  clearQuizData: () => {
    localStorage.removeItem("quiz");
    set({ quizData: [] });
  }
}));

export { useTriviaQuiz };