import { motion } from 'framer-motion';
import { BookOpen, Clock, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { QuizVersion } from '@/data/quizDataMultiVersion';

interface VersionSelectorProps {
  versions: QuizVersion[];
  onSelectVersion: (versionName: string) => void;
}

const versionIcons: Record<string, React.ReactNode> = {
  pretest: <BookOpen className="w-8 h-8" />,
  immediate_posttest: <Clock className="w-8 h-8" />,
  delayed_posttest: <Calendar className="w-8 h-8" />
};

const versionColors: Record<string, string> = {
  pretest: 'from-blue-50 to-blue-100 border-blue-200',
  immediate_posttest: 'from-green-50 to-green-100 border-green-200',
  delayed_posttest: 'from-purple-50 to-purple-100 border-purple-200'
};

const versionButtonColors: Record<string, string> = {
  pretest: 'bg-blue-600 hover:bg-blue-700',
  immediate_posttest: 'bg-green-600 hover:bg-green-700',
  delayed_posttest: 'bg-purple-600 hover:bg-purple-700'
};

export default function VersionSelector({
  versions,
  onSelectVersion,
}: VersionSelectorProps) {
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
          請選擇您要進行的測驗版本。所有版本使用相同的 10 個詞彙，
          但以不同的情境和題序呈現。
        </p>
      </motion.div>

      {/* Version Cards */}
      <motion.div variants={itemVariants} className="grid md:grid-cols-3 gap-6">
        {versions.map((version) => (
          <motion.div
            key={version.name}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Card
              className={`p-6 bg-gradient-to-br ${versionColors[version.name]} border-2 cursor-pointer transition-all`}
            >
              <div className="mb-4 text-blue-600">
                {versionIcons[version.name]}
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {version.label}
              </h3>

              <p className="text-sm text-gray-700 mb-4">
                {version.description}
              </p>

              <div className="text-xs text-gray-600 mb-6 bg-white bg-opacity-50 p-3 rounded">
                <p className="font-semibold mb-1">測驗詳情：</p>
                <ul className="space-y-1">
                  <li>• 題數：{version.questions.length} 題</li>
                  <li>• 每題：1 分</li>
                  <li>• 總分：{version.questions.length} 分</li>
                  <li>• 時間：約 10 分鐘</li>
                </ul>
              </div>

              <Button
                onClick={() => onSelectVersion(version.name)}
                className={`w-full text-white font-semibold ${
                  versionButtonColors[version.name]
                }`}
              >
                開始測驗
              </Button>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Info Section */}
      <motion.div variants={itemVariants}>
        <Card className="p-6 bg-amber-50 border-amber-200">
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
            <li>
              <strong>延遲後測 (Delayed Posttest)：</strong>
              在第三週課程進行，用於評估詞彙知識的長期保留效果
            </li>
            <li className="pt-2 border-t border-amber-300">
              所有版本使用相同的 10 個目標詞彙，但以不同的情境和題序呈現，
              以避免記憶效應並確保測量的有效性。
            </li>
          </ul>
        </Card>
      </motion.div>

      {/* Footer Note */}
      <motion.div
        variants={itemVariants}
        className="text-center text-sm text-gray-500"
      >
        <p>碩論研究實驗設計 | 第一單元詞彙測驗</p>
      </motion.div>
    </motion.div>
  );
}
