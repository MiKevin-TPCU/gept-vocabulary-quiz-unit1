import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowLeft, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { StudentInfo, ClassType } from '@/hooks/useClassroomQuiz';

interface StudentSelectorProps {
  classType: ClassType;
  students: StudentInfo[];
  onSelectStudent: (student: StudentInfo) => void;
  onBack: () => void;
}

export default function StudentSelector({
  classType,
  students,
  onSelectStudent,
  onBack,
}: StudentSelectorProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<StudentInfo | null>(null);

  const filteredStudents = useMemo(() => {
    return students.filter(student =>
      student.id.includes(searchTerm) || student.name.includes(searchTerm)
    );
  }, [students, searchTerm]);

  const handleSelectStudent = (student: StudentInfo) => {
    setSelectedStudent(student);
  };

  const handleConfirm = () => {
    if (selectedStudent) {
      onSelectStudent(selectedStudent);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
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
          選擇您的學號
        </h2>
        <p className="text-gray-600">
          {classType} - 請從下列選項中選擇您的學號和姓名
        </p>
      </motion.div>

      {/* Search Input */}
      <motion.div variants={itemVariants}>
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <Input
            placeholder="搜尋學號或姓名..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 py-2 text-base"
          />
        </div>
        <p className="text-sm text-gray-500 mt-2">
          找到 {filteredStudents.length} 位同學
        </p>
      </motion.div>

      {/* Student List */}
      <motion.div variants={itemVariants} className="max-h-96 overflow-y-auto">
        <div className="space-y-2">
          {filteredStudents.map((student) => (
            <motion.div
              key={student.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                className={`p-4 cursor-pointer transition-all border-2 ${
                  selectedStudent?.id === student.id
                    ? 'bg-blue-50 border-blue-500 shadow-md'
                    : 'bg-white border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => handleSelectStudent(student)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">
                      {student.id}
                    </p>
                    <p className="text-sm text-gray-600">
                      {student.name}
                    </p>
                  </div>
                  {selectedStudent?.id === student.id && (
                    <Check className="w-6 h-6 text-blue-600" />
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div variants={itemVariants} className="flex gap-3 justify-center">
        <Button
          onClick={onBack}
          variant="outline"
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          返回班級選擇
        </Button>

        <Button
          onClick={handleConfirm}
          disabled={!selectedStudent}
          className="px-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
        >
          確認選擇
        </Button>
      </motion.div>
    </motion.div>
  );
}
