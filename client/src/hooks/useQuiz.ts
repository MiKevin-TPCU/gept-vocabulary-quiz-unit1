import { useState, useCallback } from 'react';
import { quizData, QuizQuestion } from '@/data/quizData';

export interface QuizState {
  currentQuestionIndex: number;
  answers: Record<number, string>;
  showFeedback: boolean;
  quizCompleted: boolean;
}

export const useQuiz = () => {
  const [state, setState] = useState<QuizState>({
    currentQuestionIndex: 0,
    answers: {},
    showFeedback: false,
    quizCompleted: false,
  });

  const currentQuestion = quizData[state.currentQuestionIndex];

  const handleAnswerSelect = useCallback((answer: string) => {
    setState(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [currentQuestion.id]: answer,
      },
      showFeedback: true,
    }));
  }, [currentQuestion.id]);

  const handleNextQuestion = useCallback(() => {
    if (state.currentQuestionIndex < quizData.length - 1) {
      setState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        showFeedback: false,
      }));
    } else {
      setState(prev => ({
        ...prev,
        quizCompleted: true,
      }));
    }
  }, [state.currentQuestionIndex]);

  const handlePreviousQuestion = useCallback(() => {
    if (state.currentQuestionIndex > 0) {
      setState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex - 1,
        showFeedback: false,
      }));
    }
  }, [state.currentQuestionIndex]);

  const handleRestart = useCallback(() => {
    setState({
      currentQuestionIndex: 0,
      answers: {},
      showFeedback: false,
      quizCompleted: false,
    });
  }, []);

  const calculateScore = useCallback(() => {
    let correct = 0;
    quizData.forEach(question => {
      if (state.answers[question.id] === question.correctAnswer) {
        correct++;
      }
    });
    return {
      correct,
      total: quizData.length,
      percentage: Math.round((correct / quizData.length) * 100),
    };
  }, [state.answers]);

  const isAnswered = state.answers[currentQuestion?.id] !== undefined;
  const selectedAnswer = state.answers[currentQuestion?.id];
  const isCorrect = selectedAnswer === currentQuestion?.correctAnswer;

  return {
    state,
    currentQuestion,
    handleAnswerSelect,
    handleNextQuestion,
    handlePreviousQuestion,
    handleRestart,
    calculateScore,
    isAnswered,
    selectedAnswer,
    isCorrect,
    progress: {
      current: state.currentQuestionIndex + 1,
      total: quizData.length,
    },
  };
};
