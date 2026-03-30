import { motion } from 'framer-motion';
import { Users, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ClassType, QuizType } from '@/hooks/useClassroomQuiz';

interface ClassSelectorProps {
  testType: QuizType;
  onSelectClass: (classType: ClassType) => void;
  onBack: () => void;
}

const classInfo: Record<ClassType, { name: string; time: string; ta: string; color: string; bgColor: string }> = {
  'Class KB': {
    name: 'Class KB',
    time: 'Tuesday, AJ',
    ta: '(TA：Irene)',
    color: 'text-blue-600',
    bgColor: 'from-blue-50 to-blue-100 border-blue-200',
  },
  'Class EER': {
    name: 'Class TL',
    time: 'Friday, AI',
    ta: '(TA：Anne)',
    color: 'text-green-600',
    bgColor: 'from-green-50 to-green-100 border-green-200',
  },
  'Class TL': {
    name: 'Class EER',
    time: 'Wednesday, BM',
    ta: '(TA：Irene)',
    color: 'text-purple-600',
    bgColor: 'from-purple-50 to-purple-100 border-purple-200',
  },
};

export default function ClassSelector({
  testType,
  onSelectClass,
  onBack,
}: ClassSelectorProps) {
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
      {/* Header */}
      <motion.div variants={itemVariants} className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          選擇您的班級
        </h2>
        <p className="text-gray-600">
          請選擇您所屬的班級以繼續
        </p>
      </motion.div>

      {/* Class Cards */}
      <motion.div variants={itemVariants} className="grid md:grid-cols-3 gap-4">
        {(Object.keys(classInfo) as ClassType[]).map((classType) => {
          const info = classInfo[classType];
          return (
            <motion.div
              key={classType}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card
                className={`p-6 bg-gradient-to-br ${info.bgColor} border-2 cursor-pointer transition-all`}
                onClick={() => onSelectClass(classType)}
              >
                <div className={`mb-4 ${info.color}`}>
                  <Users className="w-10 h-10" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {info.name}
                </h3>

                <p className="text-sm text-gray-600 mb-1">
                  {info.time} {info.ta}
                </p>

                <Button
                  className="w-full text-white font-semibold"
                  style={{
                    backgroundColor: info.color.replace('text-', '').split('-')[0] === 'blue' ? '#2563eb' :
                                    info.color.replace('text-', '').split('-')[0] === 'green' ? '#16a34a' :
                                    '#9333ea'
                  }}
                >
                  選擇此班級
                </Button>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Back Button */}
      <motion.div variants={itemVariants} className="flex justify-center">
        <Button
          onClick={onBack}
          variant="outline"
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          返回測驗類型選擇
        </Button>
      </motion.div>
    </motion.div>
  );
}
