import { motion } from 'framer-motion';
import { Users, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { BiologicalSex } from '@/hooks/useClassroomQuiz';

interface SexSelectorProps {
  studentName: string;
  onSelectSex: (sex: BiologicalSex) => void;
  onBack: () => void;
}

export default function SexSelector({
  studentName,
  onSelectSex,
  onBack,
}: SexSelectorProps) {
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
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          確認生理性別
        </h2>
        <p className="text-gray-600">
          {studentName}，請選擇您的生理性別以繼續
        </p>
      </motion.div>

      {/* Sex Selection Cards */}
      <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        {/* Male */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Card
            className="p-8 bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 cursor-pointer transition-all"
            onClick={() => onSelectSex('male')}
          >
            <div className="mb-6 text-blue-600 flex justify-center">
              <div className="text-6xl">👨</div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">
              男性
            </h3>

            <p className="text-sm text-gray-600 text-center mb-6">
              Male
            </p>

            <Button
              className="w-full text-white font-semibold bg-blue-600 hover:bg-blue-700"
            >
              選擇
            </Button>
          </Card>
        </motion.div>

        {/* Female */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Card
            className="p-8 bg-gradient-to-br from-pink-50 to-pink-100 border-2 border-pink-200 cursor-pointer transition-all"
            onClick={() => onSelectSex('female')}
          >
            <div className="mb-6 text-pink-600 flex justify-center">
              <div className="text-6xl">👩</div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">
              女性
            </h3>

            <p className="text-sm text-gray-600 text-center mb-6">
              Female
            </p>

            <Button
              className="w-full text-white font-semibold bg-pink-600 hover:bg-pink-700"
            >
              選擇
            </Button>
          </Card>
        </motion.div>
      </motion.div>

      {/* Back Button */}
      <motion.div variants={itemVariants} className="flex justify-center">
        <Button
          onClick={onBack}
          variant="outline"
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          返回學生選擇
        </Button>
      </motion.div>
    </motion.div>
  );
}
