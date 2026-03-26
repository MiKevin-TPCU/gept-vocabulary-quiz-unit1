import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { QuizQuestion } from '@/data/quizDataMultiVersion';

interface QuestionCardProps {
  question: QuizQuestion;
  selectedAnswer?: string | null;
  showFeedback: boolean;
  isCorrect?: boolean | null;
  onSelectAnswer: (answer: string) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
  currentIndex: number;
  totalQuestions: number;
  timeRemaining?: number;
  formatTime?: (seconds: number) => string;
}

export default function QuestionCard({
  question,
  selectedAnswer,
  showFeedback,
  isCorrect,
  onSelectAnswer,
  onNext,
  onPrevious,
  canGoPrevious,
  canGoNext,
  currentIndex,
  totalQuestions,
  timeRemaining = 600,
  formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`,
}: QuestionCardProps) {
  const progressPercentage = ((currentIndex + 1) / totalQuestions) * 100;
  const isTimeWarning = timeRemaining < 120; // Less than 2 minutes

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <Card className="p-8 bg-white shadow-lg">
        {/* Header with Progress and Timer */}
        <div className="mb-6 space-y-4">
          {/* Progress and Timer Row */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-600">
                  問題 {currentIndex + 1} / {totalQuestions}
                </span>
                <span className="text-sm font-medium text-blue-600">
                  {Math.round(progressPercentage)}%
                </span>
              </div>
              {/* Progress Bar */}
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* Timer */}
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold whitespace-nowrap ${
                isTimeWarning
                  ? 'bg-red-100 text-red-700'
                  : 'bg-blue-100 text-blue-700'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>{formatTime(timeRemaining)}</span>
            </div>
          </div>
        </div>

        {/* Question */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            {question.sentence}
          </h2>

          {/* Options */}
          <div className="space-y-3">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === option;
              const isCorrectOption = option === question.correctAnswer;
              const showCorrect = showFeedback && isCorrectOption;
              const showIncorrect = showFeedback && isSelected && !isCorrectOption;

              return (
                <motion.button
                  key={index}
                  onClick={() => !showFeedback && onSelectAnswer(option)}
                  disabled={showFeedback}
                  whileHover={!showFeedback ? { scale: 1.02 } : {}}
                  whileTap={!showFeedback ? { scale: 0.98 } : {}}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                    showCorrect
                      ? 'border-green-500 bg-green-50'
                      : showIncorrect
                      ? 'border-red-500 bg-red-50'
                      : isSelected
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 bg-white hover:border-blue-300'
                  } ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                        showCorrect
                          ? 'border-green-500 bg-green-500'
                          : showIncorrect
                          ? 'border-red-500 bg-red-500'
                          : isSelected
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-gray-300'
                      }`}
                    >
                      {showCorrect || showIncorrect || isSelected ? (
                        <span className="text-white text-sm font-bold">
                          {String.fromCharCode(65 + index)}
                        </span>
                      ) : (
                        <span className="text-gray-400 text-sm font-bold">
                          {String.fromCharCode(65 + index)}
                        </span>
                      )}
                    </div>
                    <div className="flex-1">
                      <p
                        className={`font-medium ${
                          showCorrect
                            ? 'text-green-700'
                            : showIncorrect
                            ? 'text-red-700'
                            : isSelected
                            ? 'text-blue-700'
                            : 'text-gray-700'
                        }`}
                      >
                        {option}
                      </p>
                    </div>
                    {showCorrect && <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />}
                    {showIncorrect && <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />}
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Feedback Messages */}
          {showFeedback && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-6 p-4 rounded-lg ${
                isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
              }`}
            >
              <p
                className={`font-semibold mb-2 ${
                  isCorrect ? 'text-green-700' : 'text-red-700'
                }`}
              >
                {isCorrect ? '✓ 正確！' : '✗ 不正確'}
              </p>
              <p className="text-sm text-gray-700 mb-2">
                <strong>正確答案：</strong> {question.correctAnswer}
              </p>
              <p className="text-sm text-gray-700">
                <strong>正確答案說明：</strong> 這是正確的選項。
              </p>
            </motion.div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-3 justify-between">
          <Button
            onClick={onPrevious}
            disabled={!canGoPrevious}
            variant="outline"
            className="flex-1"
          >
            ← 上一題
          </Button>

          <Button
            onClick={onNext}
            disabled={!showFeedback || !canGoNext}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
          >
            {canGoNext ? '下一題 →' : '提交答案'}
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
