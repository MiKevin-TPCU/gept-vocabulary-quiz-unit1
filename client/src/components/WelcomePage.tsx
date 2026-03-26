import { motion } from 'framer-motion';
import { BookOpen, Zap, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface WelcomePageProps {
  onStart: () => void;
}

export default function WelcomePage({ onStart }: WelcomePageProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const features = [
    {
      icon: BookOpen,
      title: '互動式學習',
      description: '通過克漏字測驗練習 GEPT 初級詞彙',
    },
    {
      icon: Zap,
      title: '即時反饋',
      description: '每個答案都能立即獲得反饋和解釋',
    },
    {
      icon: Award,
      title: '成績統計',
      description: '完成後查看詳細的成績分析',
    },
  ];

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
          GEPT 詞彙互動測驗
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          通過互動式克漏字測驗提升您的英文詞彙能力。
          每道題目都配有詳細解釋，幫助您更好地理解和記憶單詞。
        </p>
      </motion.div>

      {/* Features */}
      <motion.div variants={itemVariants} className="grid md:grid-cols-3 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Card
              key={index}
              className="p-6 bg-white hover:shadow-lg transition-shadow"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="mb-4"
              >
                <Icon className="w-8 h-8 text-blue-600" />
              </motion.div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </Card>
          );
        })}
      </motion.div>

      {/* Info Card */}
      <motion.div variants={itemVariants}>
        <Card className="p-6 bg-blue-50 border-blue-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">測驗說明</h3>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li>• 共有 10 道題目，每題 1 分</li>
            <li>• 選擇最合適的詞彙填入空白處</li>
            <li>• 答題後立即顯示正確答案和解釋</li>
            <li>• 可以返回修改之前的答案</li>
            <li>• 完成後查看詳細的成績統計</li>
          </ul>
        </Card>
      </motion.div>

      {/* CTA Button */}
      <motion.div variants={itemVariants} className="text-center">
        <Button
          onClick={onStart}
          className="px-8 py-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg"
        >
          開始測驗
        </Button>
      </motion.div>

      {/* Footer Note */}
      <motion.div
        variants={itemVariants}
        className="text-center text-sm text-gray-500 pt-4"
      >
        <p>所有詞彙均來自 GEPT 初級官方詞彙表</p>
      </motion.div>
    </motion.div>
  );
}
