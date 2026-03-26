import { useState } from 'react';
import { motion } from 'framer-motion';
import WelcomePage from '@/components/WelcomePage';
import QuestionCard from '@/components/QuestionCard';
import ResultsPage from '@/components/ResultsPage';
import { useQuiz } from '@/hooks/useQuiz';

/**
 * Home Page - Main Quiz Interface
 * 
 * Design Philosophy:
 * - Clean, modern EdTech interface with focus on learning
 * - Bright, welcoming colors (blue primary, green success, red error)
 * - Smooth animations and transitions for engagement
 * - Clear information hierarchy and visual feedback
 */
export default function Home() {
  const [quizStarted, setQuizStarted] = useState(false);
  const quiz = useQuiz();

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  const handleRestart = () => {
    quiz.handleRestart();
    setQuizStarted(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">📚</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">GEPT 詞彙測驗</h1>
            </div>
            {quizStarted && !quiz.state.quizCompleted && (
              <div className="text-sm text-gray-600">
                進度: {quiz.progress.current} / {quiz.progress.total}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8 md:py-12">
        <motion.div
          key={
            !quizStarted ? 'welcome' : quiz.state.quizCompleted ? 'results' : 'quiz'
          }
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-2xl mx-auto"
        >
          {!quizStarted ? (
            <WelcomePage onStart={handleStartQuiz} />
          ) : quiz.state.quizCompleted ? (
            <ResultsPage
              score={quiz.calculateScore()}
              answers={quiz.state.answers}
              onRestart={handleRestart}
            />
          ) : (
            <QuestionCard
              question={quiz.currentQuestion}
              selectedAnswer={quiz.selectedAnswer}
              showFeedback={quiz.state.showFeedback}
              isCorrect={quiz.isCorrect}
              onSelectAnswer={quiz.handleAnswerSelect}
              onNext={quiz.handleNextQuestion}
              onPrevious={quiz.handlePreviousQuestion}
              canGoPrevious={quiz.progress.current > 1}
              canGoNext={quiz.progress.current < quiz.progress.total}
              currentIndex={quiz.state.currentQuestionIndex}
              totalQuestions={quiz.progress.total}
            />
          )}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-12">
        <div className="container py-6 text-center text-sm text-gray-600">
          <p>GEPT 詞彙互動測驗平台 | 所有詞彙來自 GEPT 初級官方詞彙表</p>
          <p className="mt-2 text-xs text-gray-500">
            設計用於語言學習研究實驗
          </p>
        </div>
      </footer>
    </div>
  );
}
