import type { Product } from "@/types/types";

// types.ts
export type Question = {
  id: number;
  text: string;
  options: Option[];
};

export type Option = {
  id: number;
  text: string;
  recommendedProducts: string[];
};

export type Answer = {
  questionId: number;
  optionId: number;
};

export type QuizData = {
  questions: Question[];
};

export type QuizResults = {
  recommendedProducts: {
    name: string;
    score: number;
  }[];
};

export type RecommendedProduct = Product & {
  score: number;
  photoProduct: string;
  isNew: boolean;
  volume: string;
  additionalInfo?: string;
};

export interface QuizProps {
  data: {
    questions: Question[];
  };
  onComplete: (results: {
    recommendedProducts: { name: string; score: number }[];
  }) => void;
}

export type QuizState = {
  currentQuestionIndex: number;
  answers: Answer[];
  showResults: boolean;
  recommendedProducts: RecommendedProduct[];
};
