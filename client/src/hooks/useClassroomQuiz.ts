import { useState, useCallback, useEffect } from 'react';
import { studentsData } from '@/data/studentsData';
import { QuizVersion } from '@/data/quizDataMultiVersion';

export type ClassType = 'Class TL' | 'Class KB' | 'Class EER';
export type QuizType = 'pretest' | 'immediate_posttest';
export type BiologicalSex = 'male' | 'female';

export interface StudentInfo {
  id: string;
  name: string;
}

export interface ClassroomQuizState {
  step: 'test-type' | 'class-select' | 'student-select' | 'sex-select' | 'quiz-instructions' | 'quiz' | 'results';
  selectedTestType: QuizType | null;
  selectedClass: ClassType | null;
  selectedStudent: StudentInfo | null;
  selectedSex: BiologicalSex | null;
  currentQuestionIndex: number;
  answers: Record<number, string>;
  showFeedback: boolean;
  quizCompleted: boolean;
  selectedVersion: QuizVersion | null;
  startTime: number | null;
  endTime: number | null;
  timeRemaining: number; // seconds
  isTimeUp: boolean;
}

export const useClassroomQuiz = () => {
  const [state, setState] = useState<ClassroomQuizState>({
    step: 'test-type',
    selectedTestType: null,
    selectedClass: null,
    selectedStudent: null,
    selectedSex: null,
    currentQuestionIndex: 0,
    answers: {},
    showFeedback: false,
    quizCompleted: false,
    selectedVersion: null,
    startTime: null,
    endTime: null,
    timeRemaining: 600, // 10 minutes in seconds
    isTimeUp: false,
  });

  // Timer effect
  useEffect(() => {
    if (state.step !== 'quiz' || state.isTimeUp) return;

    const interval = setInterval(() => {
      setState(prev => {
        if (prev.timeRemaining <= 1) {
          // Time's up - auto submit
          return {
            ...prev,
            timeRemaining: 0,
            isTimeUp: true,
            step: 'results',
            quizCompleted: true,
            endTime: Date.now(),
          };
        }
        return {
          ...prev,
          timeRemaining: prev.timeRemaining - 1,
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [state.step, state.isTimeUp]);

  const handleSelectTestType = useCallback((testType: QuizType) => {
    setState(prev => ({
      ...prev,
      selectedTestType: testType,
      step: 'class-select',
    }));
  }, []);

  const handleSelectClass = useCallback((classType: ClassType) => {
    setState(prev => ({
      ...prev,
      selectedClass: classType,
      step: 'student-select',
    }));
  }, []);

  const handleSelectStudent = useCallback((student: StudentInfo) => {
    setState(prev => ({
      ...prev,
      selectedStudent: student,
      step: 'sex-select',
    }));
  }, []);

  const handleSelectSex = useCallback((sex: BiologicalSex) => {
    setState(prev => ({
      ...prev,
      selectedSex: sex,
      step: 'quiz-instructions',
    }));
  }, []);

  const handleStartQuiz = useCallback((version: QuizVersion) => {
    setState(prev => ({
      ...prev,
      selectedVersion: version,
      step: 'quiz',
      startTime: Date.now(),
      timeRemaining: 600, // Reset to 10 minutes
      isTimeUp: false,
    }));
  }, []);

  const handleAnswerSelect = useCallback((answer: string) => {
    if (!state.selectedVersion) return;
    
    const currentQuestion = state.selectedVersion.questions[state.currentQuestionIndex];
    setState(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [currentQuestion.id]: answer,
      },
      showFeedback: true,
    }));
  }, [state.selectedVersion, state.currentQuestionIndex]);

  const handleNextQuestion = useCallback(() => {
    if (!state.selectedVersion) return;
    
    if (state.currentQuestionIndex < state.selectedVersion.questions.length - 1) {
      setState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        showFeedback: false,
      }));
    } else {
      // Quiz completed
      setState(prev => ({
        ...prev,
        step: 'results',
        quizCompleted: true,
        endTime: Date.now(),
      }));
    }
  }, [state.selectedVersion, state.currentQuestionIndex]);

  const handlePreviousQuestion = useCallback(() => {
    if (state.currentQuestionIndex > 0) {
      setState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex - 1,
        showFeedback: false,
      }));
    }
  }, [state.currentQuestionIndex]);

  const handleBackToClassSelect = useCallback(() => {
    setState(prev => ({
      ...prev,
      step: 'class-select',
      selectedClass: null,
      selectedStudent: null,
      selectedSex: null,
      timeRemaining: 600,
      isTimeUp: false,
    }));
  }, []);

  const handleBackToTestTypeSelect = useCallback(() => {
    setState(prev => ({
      ...prev,
      step: 'test-type',
      selectedTestType: null,
      selectedClass: null,
      selectedStudent: null,
      selectedSex: null,
      currentQuestionIndex: 0,
      answers: {},
      showFeedback: false,
      quizCompleted: false,
      timeRemaining: 600,
      isTimeUp: false,
    }));
  }, []);

  const getStudentList = useCallback(() => {
    if (!state.selectedClass) return [];
    return studentsData[state.selectedClass] || [];
  }, [state.selectedClass]);

  const calculateScore = useCallback(() => {
    if (!state.selectedVersion) return { correct: 0, total: 0, percentage: 0 };

    let correct = 0;
    state.selectedVersion.questions.forEach((q) => {
      if (state.answers[q.id] === q.correctAnswer) {
        correct++;
      }
    });

    const total = state.selectedVersion.questions.length;
    const percentage = Math.round((correct / total) * 100);

    return {
      correct,
      total,
      percentage: Math.round((correct / total) * 100),
    };
  }, [state.selectedVersion, state.answers]);

  const currentQuestion = state.selectedVersion
    ? state.selectedVersion.questions[state.currentQuestionIndex]
    : null;

  const isAnswered = currentQuestion ? state.answers[currentQuestion.id] !== undefined : false;

  const selectedAnswer = currentQuestion ? state.answers[currentQuestion.id] : null;

  const isCorrect = selectedAnswer && currentQuestion ? selectedAnswer === currentQuestion.correctAnswer : null;

  const progress = state.selectedVersion
    ? { current: state.currentQuestionIndex + 1, total: state.selectedVersion.questions.length }
    : { current: 0, total: 0 };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return {
    state,
    handleSelectTestType,
    handleSelectClass,
    handleSelectStudent,
    handleSelectSex,
    handleStartQuiz,
    handleAnswerSelect,
    handleNextQuestion,
    handlePreviousQuestion,
    handleBackToClassSelect,
    handleBackToTestTypeSelect,
    getStudentList,
    calculateScore,
    currentQuestion,
    isAnswered,
    selectedAnswer,
    isCorrect,
    progress,
    formatTime,
  };
};
