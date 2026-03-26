import { motion } from 'framer-motion';
import { RotateCcw, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { quizData } from '@/data/quizData';

interface ResultsPageProps {
  score: {
    correct: number;
    total: number;
    percentage: number;
  };
  answers: Record<number, string>;
  onRestart: () => void;
}

export default function ResultsPage({ score, answers, onRestart }: ResultsPageProps) {
  const isPassed = score.percentage >= 70;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full space-y-6"
    >
      {/* Score Card */}
      <motion.div variants={itemVariants}>
        <Card className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
              className="mb-4"
            >
              {isPassed ? (
                <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
              ) : (
                <XCircle className="w-16 h-16 text-orange-500 mx-auto" />
              )}
            </motion.div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {isPassed ? '恭喜！' : '再加油！'}
            </h2>
            <p className="text-gray-600 mb-6">
              {isPassed
                ? '您已成功通過此測驗！'
                : '請再試一次以改進您的成績。'}
            </p>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-white rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">正確答案</p>
                <p className="text-2xl font-bold text-green-600">{score.correct}</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">總題數</p>
                <p className="text-2xl font-bold text-blue-600">{score.total}</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">成績</p>
                <p className="text-2xl font-bold text-indigo-600">{score.percentage}%</p>
              </div>
            </div>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="origin-left"
            >
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-3 rounded-full transition-all duration-1000 ${
                    isPassed ? 'bg-green-500' : 'bg-orange-500'
                  }`}
                  style={{ width: `${score.percentage}%` }}
                />
              </div>
            </motion.div>
          </div>
        </Card>
      </motion.div>

      {/* Detailed Results */}
      <motion.div variants={itemVariants}>
        <Card className="p-6 bg-white">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">詳細答案</h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {quizData.map((question, index) => {
              const userAnswer = answers[question.id];
              const isCorrect = userAnswer === question.correctAnswer;

              return (
                <motion.div
                  key={question.id}
                  variants={itemVariants}
                  className={`p-4 rounded-lg border-l-4 ${
                    isCorrect
                      ? 'bg-green-50 border-green-500'
                      : 'bg-red-50 border-red-500'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 mb-1">
                        第 {index + 1} 題
                      </p>
                      <p className="text-sm text-gray-700 mb-2">
                        <strong>詞彙：</strong> {question.correctAnswer}
                      </p>
                      <p className="text-sm text-gray-700">
                        <strong>您的答案：</strong>{' '}
                        <span className={isCorrect ? 'text-green-600' : 'text-red-600'}>
                          {userAnswer || '未作答'}
                        </span>
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Card>
      </motion.div>

      {/* Action Buttons */}
      <motion.div variants={itemVariants} className="flex gap-4 justify-center">
        <Button
          onClick={onRestart}
          className="px-8 py-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center gap-2"
        >
          <RotateCcw className="w-5 h-5" />
          重新開始
        </Button>
      </motion.div>
    </motion.div>
  );
}
