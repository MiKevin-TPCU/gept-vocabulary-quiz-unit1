import { motion } from 'framer-motion';
import { AlertCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { StudentInfo, QuizType } from '@/hooks/useClassroomQuiz';
import { QuizVersion } from '@/data/quizDataMultiVersion';

interface QuizInstructionsProps {
  student: StudentInfo;
  testType: QuizType;
  quizVersion: QuizVersion;
  onStart: () => void;
  onBack: () => void;
}

const testTypeInfo: Record<QuizType, { name: string; description: string }> = {
  pretest: {
    name: '前測 (Pretest)',
    description: '第一週課程開始前進行',
  },
  immediate_posttest: {
    name: '立即後測 (Immediate Posttest)',
    description: '第一週課程結束時進行',
  },
};

export default function QuizInstructions({
  student,
  testType,
  quizVersion,
  onStart,
  onBack,
}: QuizInstructionsProps) {
  const info = testTypeInfo[testType];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
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
      {/* Student Info */}
      <motion.div variants={itemVariants}>
        <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            填答者資訊
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">學號</p>
              <p className="text-lg font-semibold text-gray-900">{student.id}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">姓名</p>
              <p className="text-lg font-semibold text-gray-900">{student.name}</p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Test Type Info */}
      <motion.div variants={itemVariants}>
        <Card className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            測驗類型
          </h2>
          <div className="space-y-2">
            <p className="text-lg font-semibold text-gray-900">{info.name}</p>
            <p className="text-gray-600">{info.description}</p>
          </div>
        </Card>
      </motion.div>

      {/* Instructions */}
      <motion.div variants={itemVariants}>
        <Card className="p-6 bg-white border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            測驗說明
          </h2>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                1
              </div>
              <div>
                <p className="font-semibold text-gray-900">題目數量</p>
                <p className="text-gray-600">共有 10 道克漏字題目</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                2
              </div>
              <div>
                <p className="font-semibold text-gray-900">計分方式</p>
                <p className="text-gray-600">每題 10 分，共 100 分，不倒扣分</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                3
              </div>
              <div>
                <p className="font-semibold text-gray-900">時間限制</p>
                <p className="text-gray-600">10 分鐘內完成測驗</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                4
              </div>
              <div>
                <p className="font-semibold text-gray-900">答題方式</p>
                <p className="text-gray-600">選擇最合適的詞彙填入空白處（四選一）</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                5
              </div>
              <div>
                <p className="font-semibold text-gray-900">即時反饋</p>
                <p className="text-gray-600">每題答題後立即顯示正確答案和解釋</p>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Warning */}
      <motion.div variants={itemVariants}>
        <Card className="p-4 bg-amber-50 border-amber-200 flex gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-900 mb-1">重要提醒</p>
            <p className="text-sm text-amber-800">
              開始測驗後，請勿重新整理頁面。確保您已準備好並有充足的時間完成測驗。
            </p>
          </div>
        </Card>
      </motion.div>

      {/* Action Buttons */}
      <motion.div variants={itemVariants} className="flex gap-3 justify-center">
        <Button
          onClick={onBack}
          variant="outline"
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          返回
        </Button>

        <Button
          onClick={onStart}
          className="px-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center gap-2"
        >
          開始測驗
          <ArrowRight className="w-4 h-4" />
        </Button>
      </motion.div>
    </motion.div>
  );
}
