import { motion } from 'framer-motion';
import TestTypeSelector from '@/components/TestTypeSelector';
import ClassSelector from '@/components/ClassSelector';
import StudentSelector from '@/components/StudentSelector';
import SexSelector from '@/components/SexSelector';
import QuizInstructions from '@/components/QuizInstructions';
import QuestionCard from '@/components/QuestionCard';
import ResultsPage from '@/components/ResultsPage';
import { useClassroomQuiz } from '@/hooks/useClassroomQuiz';
import { getQuizVersion } from '@/data/quizDataMultiVersion';
import PasswordProtection from '@/components/PasswordProtection';
import { useState } from 'react';
import { Lock } from 'lucide-react';

/**
 * Home Page - Classroom Quiz Interface
 * 
 * Design Philosophy:
 * - Modern EdTech interface with focus on classroom management
 * - Clear step-by-step flow: Test Type → Class → Student → Sex → Instructions → Quiz → Results
 * - Bright, welcoming colors with smooth animations
 * - Support for three classes and student verification
 */
export default function Home() {
  const quiz = useClassroomQuiz();
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  // Get quiz version based on test type
  // Use selectedTestType to get the quiz version for quiz-instructions step
  const quizVersion = quiz.state.selectedTestType
    ? getQuizVersion(quiz.state.selectedTestType)
    : quiz.state.selectedVersion;

  const handleAdminAccess = () => {
    setShowPasswordModal(true);
  };

  const handlePasswordSuccess = () => {
    setShowPasswordModal(false);
    setIsAdminAuthenticated(true);
    // Redirect to admin dashboard
    window.location.href = '/admin';
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
            {quiz.state.selectedStudent && (
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>{quiz.state.selectedStudent.id} - {quiz.state.selectedStudent.name}</span>
                {quiz.state.selectedSex && (
                  <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                    {quiz.state.selectedSex === 'male' ? '男' : '女'}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="container max-w-4xl py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Step 1: Test Type Selection */}
          {quiz.state.step === 'test-type' && (
            <TestTypeSelector
              onSelectTestType={quiz.handleSelectTestType}
            />
          )}

          {/* Step 2: Class Selection */}
          {quiz.state.step === 'class-select' && (
            <ClassSelector
              testType={quiz.state.selectedTestType || 'pretest'}
              onSelectClass={quiz.handleSelectClass}
              onBack={quiz.handleBackToTestTypeSelect}
            />
          )}

          {/* Step 3: Student Selection */}
          {quiz.state.step === 'student-select' && quiz.state.selectedClass && (
            <StudentSelector
              classType={quiz.state.selectedClass}
              students={quiz.getStudentList()}
              onSelectStudent={quiz.handleSelectStudent}
              onBack={quiz.handleBackToClassSelect}
            />
          )}

          {/* Step 4: Sex Selection */}
          {quiz.state.step === 'sex-select' && quiz.state.selectedStudent && (
            <SexSelector
              studentName={quiz.state.selectedStudent.name}
              onSelectSex={quiz.handleSelectSex}
              onBack={() => {
                quiz.handleBackToClassSelect();
              }}
            />
          )}

          {/* Step 5: Quiz Instructions */}
          {quiz.state.step === 'quiz-instructions' && 
           quiz.state.selectedStudent && 
           quizVersion && (
            <QuizInstructions
              student={quiz.state.selectedStudent}
              testType={quiz.state.selectedTestType!}
              quizVersion={quizVersion}
              onStart={() => quizVersion && quiz.handleStartQuiz(quizVersion)}
              onBack={() => {
                quiz.handleBackToClassSelect();
              }}
            />
          )}

          {/* Error state: quiz-instructions but no version */}
          {quiz.state.step === 'quiz-instructions' && quiz.state.selectedStudent && !quizVersion && (
            <div className="container max-w-2xl py-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 rounded-lg p-6 text-center"
              >
                <p className="text-red-700 font-semibold mb-4">錯誤：無法加載測驗版本</p>
                <button
                  onClick={() => window.location.href = '/'}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
                >
                  返回首頁
                </button>
              </motion.div>
            </div>
          )}

          {/* Step 6: Quiz */}
          {quiz.state.step === 'quiz' && quiz.currentQuestion && (
            <QuestionCard
              question={quiz.currentQuestion}
              selectedAnswer={quiz.state.answers[quiz.currentQuestion.id] || null}
              showFeedback={quiz.state.showFeedback}
              isCorrect={quiz.state.answers[quiz.currentQuestion.id] === quiz.currentQuestion.correctAnswer || null}
              onSelectAnswer={quiz.handleAnswerSelect}
              onNext={quiz.handleNextQuestion}
              onPrevious={quiz.handlePreviousQuestion}
              canGoPrevious={quiz.state.currentQuestionIndex > 0}
              canGoNext={quiz.state.currentQuestionIndex < (quizVersion?.questions.length || 10) - 1}
              currentIndex={quiz.state.currentQuestionIndex}
              totalQuestions={quizVersion?.questions.length || 10}
              timeRemaining={quiz.state.timeRemaining}
            />
          )}

          {/* Step 7: Results */}
          {quiz.state.step === 'results' && quiz.state.quizCompleted && quizVersion && (
            <ResultsPage
              score={{
                correct: Object.values(quiz.state.answers).filter((answer, idx) => answer === quizVersion.questions[idx]?.correctAnswer).length,
                total: quizVersion.questions.length,
                percentage: (Object.values(quiz.state.answers).filter((answer, idx) => answer === quizVersion.questions[idx]?.correctAnswer).length / quizVersion.questions.length) * 100,
              }}
              questions={quizVersion.questions}
              answers={quiz.state.answers}
              versionLabel={quizVersion.label}
              studentInfo={quiz.state.selectedStudent || { id: '', name: '' }}
              testType={quiz.state.selectedTestType || 'pretest'}
              classType={quiz.state.selectedClass}
              biologicalSex={quiz.state.selectedSex || 'male'}
              startTime={quiz.state.startTime}
              endTime={quiz.state.endTime}
              onRestart={() => {
                window.location.href = '/';
              }}
              onBackHome={() => {
                window.location.href = '/';
              }}
            />
          )}
        </motion.div>
      </main>

      {/* Teacher Management Section */}
      {quiz.state.step === 'test-type' && (
        <div className="container max-w-2xl py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <button
              onClick={handleAdminAccess}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-900 text-white font-semibold rounded-lg transition-all hover:shadow-lg"
            >
              <Lock className="w-4 h-4" />
              教師管理
            </button>
            <p className="text-xs text-gray-500 mt-3">教師用 - 用於管理測驗數據和成績</p>
          </motion.div>
        </div>
      )}

      {/* Password Protection Modal */}
      {showPasswordModal && (
        <PasswordProtection
          onSuccess={handlePasswordSuccess}
          onCancel={() => setShowPasswordModal(false)}
          correctPassword="mikekaku"
        />
      )}

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-12">
        <div className="container py-6 text-center text-sm text-gray-600">
          <p>GEPT 詞彙互動測驗平台</p>
          <p className="mt-2 text-xs text-gray-500">
            碩論研究實驗設計 - 第二週測驗
          </p>
        </div>
      </footer>
    </div>
  );
}
