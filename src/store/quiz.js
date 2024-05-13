import { create } from "zustand";

const useTriviaQuiz = create((set) => ({
  quizData: [],
  setQuizData: (data) => {
    const quiz = localStorage.getItem("quiz");
    if (quiz) {
      set({ quizData: JSON.parse(quiz) });
    }
    else {
      localStorage.setItem("quiz", JSON.stringify(data));
      set({ quizData: data });
    }
  },
  clearQuizData: () => {
    localStorage.removeItem("quiz");
    set({ quizData: [] })
  }
}));

export { useTriviaQuiz };