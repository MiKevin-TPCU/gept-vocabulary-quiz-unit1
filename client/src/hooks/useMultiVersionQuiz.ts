import { useState, useCallback } from 'react';
import { QuizQuestion, QuizVersion } from '@/data/quizDataMultiVersion';

export interface QuizState {
  currentQuestionIndex: number;
  answers: Record<number, string>;
  showFeedback: boolean;
  quizCompleted: boolean;
  selectedVersion: QuizVersion | null;
}

export const useMultiVersionQuiz = () => {
  const [state, setState] = useState<QuizState>({
    currentQuestionIndex: 0,
    answers: {},
    showFeedback: false,
    quizCompleted: false,
    selectedVersion: null,
  });

  const currentQuestion = state.selectedVersion?.questions[state.currentQuestionIndex];

  const handleSelectVersion = useCallback((version: QuizVersion) => {
    setState(prev => ({
      ...prev,
      selectedVersion: version,
      currentQuestionIndex: 0,
      answers: {},
      showFeedback: false,
      quizCompleted: false,
    }));
  }, []);

  const handleAnswerSelect = useCallback((answer: string) => {
    if (!currentQuestion) return;
    
    setState(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [currentQuestion.id]: answer,
      },
      showFeedback: true,
    }));
  }, [currentQuestion]);

  const handleNextQuestion = useCallback(() => {
    if (!state.selectedVersion) return;
    
    if (state.currentQuestionIndex < state.selectedVersion.questions.length - 1) {
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
  }, [state.currentQuestionIndex, state.selectedVersion]);

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
    setState(prev => ({
      ...prev,
      currentQuestionIndex: 0,
      answers: {},
      showFeedback: false,
      quizCompleted: false,
      selectedVersion: null,
    }));
  }, []);

  const handleRestartSameVersion = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentQuestionIndex: 0,
      answers: {},
      showFeedback: false,
      quizCompleted: false,
    }));
  }, []);

  const calculateScore = useCallback(() => {
    if (!state.selectedVersion) {
      return { correct: 0, total: 0, percentage: 0 };
    }

    let correct = 0;
    state.selectedVersion.questions.forEach(question => {
      if (state.answers[question.id] === question.correctAnswer) {
        correct++;
      }
    });
    
    const total = state.selectedVersion.questions.length;
    return {
      correct,
      total,
      percentage: Math.round((correct / total) * 100),
    };
  }, [state.answers, state.selectedVersion]);

  const isAnswered = currentQuestion ? state.answers[currentQuestion.id] !== undefined : false;
  const selectedAnswer = currentQuestion ? state.answers[currentQuestion.id] : undefined;
  const isCorrect = selectedAnswer === currentQuestion?.correctAnswer;

  const progress = state.selectedVersion ? {
    current: state.currentQuestionIndex + 1,
    total: state.selectedVersion.questions.length,
  } : { current: 0, total: 0 };

  return {
    state,
    currentQuestion,
    handleSelectVersion,
    handleAnswerSelect,
    handleNextQuestion,
    handlePreviousQuestion,
    handleRestart,
    handleRestartSameVersion,
    calculateScore,
    isAnswered,
    selectedAnswer,
    isCorrect,
    progress,
  };
};
