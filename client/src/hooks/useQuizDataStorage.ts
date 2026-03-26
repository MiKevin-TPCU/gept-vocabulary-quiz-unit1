import { useCallback, useState } from 'react';
import { StudentInfo, BiologicalSex, QuizType } from './useClassroomQuiz';

export interface QuizRecord {
  id: string;
  studentId: string;
  studentName: string;
  biologicalSex: BiologicalSex;
  classType: string;
  testType: QuizType;
  startTime: string; // ISO string
  endTime: string; // ISO string
  duration: number; // seconds
  totalQuestions: number;
  correctAnswers: number;
  totalScore: number;
  answers: Record<number, { questionId: number; selected: string; correct: string; isCorrect: boolean }>;
  timestamp: string; // ISO string
}

const STORAGE_KEY = 'gept_quiz_records';

export const useQuizDataStorage = () => {
  const [records, setRecords] = useState<QuizRecord[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const saveQuizRecord = useCallback((
    student: StudentInfo,
    sex: BiologicalSex,
    classType: string,
    testType: QuizType,
    startTime: number,
    endTime: number,
    answers: Record<number, string>,
    correctAnswers: number,
    totalQuestions: number,
    totalScore: number,
    questionAnswerMap: Record<number, { questionId: number; selected: string; correct: string; isCorrect: boolean }>
  ) => {
    const newRecord: QuizRecord = {
      id: `${student.id}_${testType}_${Date.now()}`,
      studentId: student.id,
      studentName: student.name,
      biologicalSex: sex,
      classType,
      testType,
      startTime: new Date(startTime).toISOString(),
      endTime: new Date(endTime).toISOString(),
      duration: Math.round((endTime - startTime) / 1000),
      totalQuestions,
      correctAnswers,
      totalScore,
      answers: questionAnswerMap,
      timestamp: new Date().toISOString(),
    };

    setRecords(prev => {
      const updated = [...prev, newRecord];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save quiz record:', e);
      }
      return updated;
    });

    return newRecord;
  }, []);

  const exportToCSV = useCallback(() => {
    if (records.length === 0) {
      alert('沒有測驗記錄可導出');
      return;
    }

    // Prepare CSV header
    const headers = [
      '測驗時間',
      '進行時長(秒)',
      '學號',
      '姓名',
      '生理性別',
      '班級',
      '測驗類型',
      '總題數',
      '正確題數',
      '總成績',
      '各題答案',
    ];

    // Prepare CSV rows
    const rows = records.map(record => {
      const answerDetails = Object.entries(record.answers)
        .map(([_, answer]) => `Q${answer.questionId}:${answer.selected}${answer.isCorrect ? '✓' : '✗'}`)
        .join(' | ');

      return [
        record.timestamp,
        record.duration,
        record.studentId,
        record.studentName,
        record.biologicalSex === 'male' ? '男' : '女',
        record.classType,
        record.testType === 'pretest' ? '前測' : '立即後測',
        record.totalQuestions,
        record.correctAnswers,
        record.totalScore,
        answerDetails,
      ];
    });

    // Create CSV content
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
    ].join('\n');

    // Download CSV
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `GEPT_Quiz_Results_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [records]);

  const exportToJSON = useCallback(() => {
    if (records.length === 0) {
      alert('沒有測驗記錄可導出');
      return;
    }

    const jsonContent = JSON.stringify(records, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `GEPT_Quiz_Results_${new Date().toISOString().split('T')[0]}.json`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [records]);

  const clearAllRecords = useCallback(() => {
    if (window.confirm('確定要清除所有測驗記錄嗎？此操作無法撤銷。')) {
      setRecords([]);
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (e) {
        console.error('Failed to clear records:', e);
      }
    }
  }, []);

  const getRecordsByClass = useCallback((classType: string) => {
    return records.filter(r => r.classType === classType);
  }, [records]);

  const getRecordsByTestType = useCallback((testType: QuizType) => {
    return records.filter(r => r.testType === testType);
  }, [records]);

  return {
    records,
    saveQuizRecord,
    exportToCSV,
    exportToJSON,
    clearAllRecords,
    getRecordsByClass,
    getRecordsByTestType,
  };
};
