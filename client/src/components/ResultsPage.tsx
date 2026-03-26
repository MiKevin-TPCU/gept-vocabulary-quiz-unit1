import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, CheckCircle2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useQuizDataStorage } from '@/hooks/useQuizDataStorage';

interface ResultsPageProps {
  score: {
    correct: number;
    total: number;
    percentage: number;
  };
  answers: Record<number, string>;
  versionLabel?: string;
  studentInfo?: { id: string; name: string } | null;
  testType?: string | null;
  classType?: string;
  biologicalSex?: string;
  startTime?: number;
  endTime?: number;
  onRestart: () => void;
  onBackToVersions?: () => void;
}

export default function ResultsPage({
  score,
  answers,
  versionLabel,
  studentInfo,
  testType,
  onRestart,
  onBackToVersions,
}: ResultsPageProps) {
  const { saveQuizRecord } = useQuizDataStorage();
  const isPassed = score.percentage >= 70;

  // Save quiz record on component mount
  useEffect(() => {
    if (studentInfo && testType) {
      // This would need to be passed from parent component
      // For now, we'll just log that the record should be saved
      console.log('Quiz completed - record should be saved to storage');
    }
  }, [studentInfo, testType, saveQuizRecord]);

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
            {versionLabel && (
              <p className="text-sm text-blue-600 font-semibold mb-2">
                {versionLabel}
              </p>
            )}

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
              className="mb-4"
            >
              {isPassed ? (
                <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
              ) : (
                <CheckCircle2 className="w-16 h-16 text-orange-500 mx-auto" />
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

      {/* Answer Summary */}
      <motion.div variants={itemVariants}>
        <Card className="p-6 bg-white">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">您的答案</h3>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {Object.entries(answers).map((entry, index) => {
              const userAnswer = entry[1];
              return (
                <motion.div
                  key={entry[0]}
                  variants={itemVariants}
                  className="p-3 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-gray-600 w-8">
                      第 {index + 1}
                    </span>
                    <span className="text-sm text-gray-700">
                      <strong>答案：</strong>
                      <span className="text-blue-600 font-medium ml-2">
                        {userAnswer || '未作答'}
                      </span>
                    </span>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0" />
                </motion.div>
              );
            })}
          </div>
        </Card>
      </motion.div>

      {/* Action Buttons */}
      <motion.div variants={itemVariants} className="flex gap-4 justify-center flex-wrap">
        <Button
          onClick={onRestart}
          className="px-8 py-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center gap-2"
        >
          <RotateCcw className="w-5 h-5" />
          重新開始此版本
        </Button>
        {onBackToVersions && (
          <Button
            onClick={onBackToVersions}
            variant="outline"
            className="px-8 py-6 font-semibold flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            返回版本選擇
          </Button>
        )}
      </motion.div>
    </motion.div>
  );
}
