import { motion } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { QuizQuestion } from '@/data/quizDataMultiVersion';

interface QuestionCardProps {
  question: QuizQuestion;
  selectedAnswer?: string;
  showFeedback: boolean;
  isCorrect?: boolean;
  onSelectAnswer: (answer: string) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
  currentIndex: number;
  totalQuestions: number;
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
}: QuestionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <Card className="p-8 bg-white shadow-lg">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">
              問題 {currentIndex + 1} / {totalQuestions}
            </span>
            <span className="text-sm font-medium text-blue-600">
              {Math.round(((currentIndex + 1) / totalQuestions) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-blue-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Question Text */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 leading-relaxed">
            {question.sentence}
          </h2>
        </div>

        {/* Options */}
        <div className="space-y-3 mb-8">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === option;
            const isOptionCorrect = option === question.correctAnswer;
            const showCorrect = showFeedback && isOptionCorrect;
            const showIncorrect = showFeedback && isSelected && !isOptionCorrect;

            return (
              <motion.button
                key={option}
                onClick={() => !showFeedback && onSelectAnswer(option)}
                disabled={showFeedback}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                  isSelected
                    ? showCorrect
                      ? 'border-green-500 bg-green-50'
                      : showIncorrect
                      ? 'border-red-500 bg-red-50'
                      : 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50'
                } ${showFeedback && !isSelected && !isOptionCorrect ? 'opacity-50' : ''}`}
                whileHover={!showFeedback ? { scale: 1.02 } : {}}
                whileTap={!showFeedback ? { scale: 0.98 } : {}}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">{option}</span>
                  {showCorrect && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                  {showIncorrect && <XCircle className="w-5 h-5 text-red-500" />}
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Feedback Section */}
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`p-4 rounded-lg mb-6 ${
              isCorrect
                ? 'bg-green-50 border border-green-200'
                : 'bg-red-50 border border-red-200'
            }`}
          >
            <div className="mb-3">
              <p className={`font-semibold ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                {isCorrect ? '✓ 正確！' : '✗ 錯誤'}
              </p>
            </div>
            <div className="text-sm text-gray-700">
              <p className="mb-2">
                <strong>正確答案：</strong> {question.correctAnswer}
              </p>
            </div>
          </motion.div>
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-3 justify-between">
          <Button
            onClick={onPrevious}
            disabled={!canGoPrevious}
            variant="outline"
            className="px-6"
          >
            ← 上一題
          </Button>

          <Button
            onClick={onNext}
            disabled={!selectedAnswer || !canGoNext}
            className="px-6 bg-blue-600 hover:bg-blue-700"
          >
            {currentIndex === totalQuestions - 1 ? '完成 →' : '下一題 →'}
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
