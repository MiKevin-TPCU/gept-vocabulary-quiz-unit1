import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
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
  const isAnswered = selectedAnswer !== null && selectedAnswer !== undefined;

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
              {formatTime(timeRemaining)}
            </div>
          </div>
        </div>

        {/* Question Text */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">{question.sentence}</h2>
        </div>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === option;

            return (
              <motion.button
                key={index}
                onClick={() => onSelectAnswer(option)}
                disabled={false}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 bg-white hover:border-blue-300'
                } cursor-pointer`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                      isSelected
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300'
                    }`}
                  >
                    {isSelected ? (
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
                        isSelected
                          ? 'text-blue-700'
                          : 'text-gray-700'
                      }`}
                    >
                      {option}
                    </p>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Status Message */}
        {isAnswered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-lg bg-blue-50 border border-blue-200"
          >
            <p className="text-blue-700 font-semibold">
              ✓ 已填答。請點擊「下一題」繼續。
            </p>
          </motion.div>
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-3">
          {/* Previous Button - Always Disabled */}
          <Button
            onClick={onPrevious}
            disabled={true}
            variant="outline"
            className="flex-1 opacity-50 cursor-not-allowed"
            title="無法返回前一題"
          >
            ← 上一題（禁用）
          </Button>

          {/* Next Button - Only enabled after answering */}
          <Button
            onClick={onNext}
            disabled={!isAnswered}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
          >
            {canGoNext ? '下一題 →' : '查看結果'}
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
