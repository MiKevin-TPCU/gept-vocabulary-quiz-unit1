import { motion } from 'framer-motion';
import { BookOpen, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { QuizType } from '@/hooks/useClassroomQuiz';

interface TestTypeSelectorProps {
  onSelectTestType: (testType: QuizType) => void;
}

export default function TestTypeSelector({ onSelectTestType }: TestTypeSelectorProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
      className="w-full space-y-8"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          GEPT 詞彙測驗
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          第一週 - 請選擇您要進行的測驗類型
        </p>
      </motion.div>

      {/* Test Type Cards */}
      <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        {/* Pretest */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Card
            className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 cursor-pointer transition-all"
            onClick={() => onSelectTestType('pretest')}
          >
            <div className="mb-4 text-blue-600">
              <BookOpen className="w-12 h-12" />
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              前測 (Pretest)
            </h3>

            <p className="text-sm text-gray-700 mb-6">
              第一週課程開始前進行
            </p>

            <div className="text-xs text-gray-600 mb-6 bg-white bg-opacity-70 p-3 rounded">
              <p className="font-semibold mb-2">測驗詳情：</p>
              <ul className="space-y-1">
                <li>• 題數：10 題</li>
                <li>• 每題：10 分</li>
                <li>• 總分：100 分</li>
                <li>• 時間：10 分鐘</li>
                <li>• 不倒扣分</li>
              </ul>
            </div>

            <Button
              className="w-full text-white font-semibold bg-blue-600 hover:bg-blue-700"
            >
              開始前測
            </Button>
          </Card>
        </motion.div>

        {/* Immediate Posttest */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Card
            className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 cursor-pointer transition-all"
            onClick={() => onSelectTestType('immediate_posttest')}
          >
            <div className="mb-4 text-green-600">
              <Clock className="w-12 h-12" />
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              立即後測 (Immediate Posttest)
            </h3>

            <p className="text-sm text-gray-700 mb-6">
              第一週課程結束前進行
            </p>

            <div className="text-xs text-gray-600 mb-6 bg-white bg-opacity-70 p-3 rounded">
              <p className="font-semibold mb-2">測驗詳情：</p>
              <ul className="space-y-1">
                <li>• 題數：10 題</li>
                <li>• 每題：10 分</li>
                <li>• 總分：100 分</li>
                <li>• 時間：10 分鐘</li>
                <li>• 不倒扣分</li>
              </ul>
            </div>

            <Button
              className="w-full text-white font-semibold bg-green-600 hover:bg-green-700"
            >
              開始立即後測
            </Button>
          </Card>
        </motion.div>
      </motion.div>

      {/* Info Section */}
      <motion.div variants={itemVariants}>
        <Card className="p-6 bg-amber-50 border-amber-200 max-w-2xl mx-auto">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            📋 測驗說明
          </h3>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li>
              <strong>前測 (Pretest)：</strong>
              在第一週課程開始前進行，用於評估學生的初始詞彙知識
            </li>
            <li>
              <strong>立即後測 (Immediate Posttest)：</strong>
              在第一週課程結束時進行，用於評估課程對詞彙學習的即時效果
            </li>
            <li className="pt-2 border-t border-amber-300">
              選擇測驗類型後，請選擇您的班級和學號以開始測驗。
            </li>
          </ul>
        </Card>
      </motion.div>
    </motion.div>
  );
}
