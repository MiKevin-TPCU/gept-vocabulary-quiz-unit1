import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useQuizDataStorage } from '@/hooks/useQuizDataStorage';
import { QuizVersion } from '@/data/quizDataMultiVersion';

interface ResultsPageProps {
  score: {
    correct: number;
    total: number;
    percentage: number;
  };
  answers: Record<number, string>;
  questions: QuizVersion['questions'];
  versionLabel?: string;
  studentInfo?: { id: string; name: string } | null;
  testType?: string | null;
  classType?: string | null;
  biologicalSex?: string;
  startTime?: number | null;
  endTime?: number | null;
  onRestart: () => void;
  onBackHome?: () => void;
}

export default function ResultsPage({
  score,
  answers,
  questions,
  versionLabel,
  studentInfo,
  testType,
  classType,
  biologicalSex,
  startTime,
  endTime,
  onRestart,
  onBackHome,
}: ResultsPageProps) {
  const { saveQuizRecord } = useQuizDataStorage();

  // Calculate duration
  const duration = startTime && endTime ? Math.floor((endTime - startTime) / 1000) : 0;

  // Save quiz record on component mount
  useEffect(() => {
    if (studentInfo && testType && classType && biologicalSex && startTime && endTime) {
      try {
        const questionAnswerMap: Record<number, { questionId: number; selected: string; correct: string; isCorrect: boolean }> = {};
        questions.forEach(q => {
          questionAnswerMap[q.id] = {
            questionId: q.id,
            selected: answers[q.id] || '',
            correct: q.correctAnswer,
            isCorrect: answers[q.id] === q.correctAnswer,
          };
        });

        saveQuizRecord(
          studentInfo,
          biologicalSex as 'male' | 'female',
          classType,
          testType as any,
          startTime,
          endTime,
          answers,
          score.correct,
          score.total,
          score.percentage,
          questionAnswerMap
        );
      } catch (error) {
        console.log('Quiz record saved to local storage');
      }
    }
  }, [studentInfo, testType, classType, biologicalSex, saveQuizRecord, answers, score, startTime, endTime, questions]);

  // Determine encouragement message based on score
  const getEncouragementMessage = (percentage: number) => {
    if (percentage >= 90) {
      return {
        title: '🌟 傑出表現！',
        message: '您的表現非常優秀！繼續保持這樣的學習態度，您一定會成功！',
        color: 'from-yellow-400 to-orange-500',
        textColor: 'text-white',
      };
    } else if (percentage >= 80) {
      return {
        title: '👏 很好的成績！',
        message: '您做得很好！再多加努力，您會更加進步！',
        color: 'from-blue-400 to-cyan-500',
        textColor: 'text-white',
      };
    } else if (percentage >= 70) {
      return {
        title: '✓ 及格了！',
        message: '恭喜您及格了！持續學習，您會越來越進步！',
        color: 'from-green-400 to-emerald-500',
        textColor: 'text-white',
      };
    } else if (percentage >= 50) {
      return {
        title: '💪 再接再厲！',
        message: '您已經掌握了一半的內容，再加油一點就能進步！',
        color: 'from-purple-400 to-pink-500',
        textColor: 'text-white',
      };
    } else {
      return {
        title: '🎯 加油！',
        message: '這次的成績還有進步空間，建議您複習相關內容，下次一定會更好！',
        color: 'from-orange-400 to-red-500',
        textColor: 'text-white',
      };
    }
  };

  const encouragement = getEncouragementMessage(score.percentage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
      <div className="container max-w-4xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {/* Score Summary Card */}
          <Card className={`p-8 bg-gradient-to-r ${encouragement.color} ${encouragement.textColor} shadow-xl`}>
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold">{encouragement.title}</h1>
              <p className="text-lg opacity-90">{encouragement.message}</p>

              {/* Big Score Display */}
              <div className="py-6">
                <div className="text-6xl font-bold">{score.percentage}</div>
                <div className="text-xl opacity-90 mt-2">
                  {score.correct} / {score.total} 題正確
                </div>
              </div>
            </div>
          </Card>

          {/* Student Info Card */}
          {studentInfo && (
            <Card className="p-6 bg-white shadow-lg">
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600 mb-1">學號</p>
                  <p className="font-semibold text-gray-900">{studentInfo.id}</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">姓名</p>
                  <p className="font-semibold text-gray-900">{studentInfo.name}</p>
                </div>
                {biologicalSex && (
                  <div>
                    <p className="text-gray-600 mb-1">生理性別</p>
                    <p className="font-semibold text-gray-900">
                      {biologicalSex === 'male' ? '男' : '女'}
                    </p>
                  </div>
                )}
                {duration > 0 && (
                  <div>
                    <p className="text-gray-600 mb-1">進行時長</p>
                    <p className="font-semibold text-gray-900">
                      {Math.floor(duration / 60)}分 {duration % 60}秒
                    </p>
                  </div>
                )}
              </div>
            </Card>
          )}

          {/* Question Results Grid */}
          <Card className="p-8 bg-white shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">答題詳情</h2>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {questions.map((question, index) => {
                const userAnswer = answers[question.id];
                const isCorrect = userAnswer === question.correctAnswer;

                return (
                  <motion.div
                    key={question.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className={`p-4 rounded-lg border-2 text-center transition-all ${
                      isCorrect
                        ? 'border-green-500 bg-green-50'
                        : 'border-red-500 bg-red-50'
                    }`}
                  >
                    <div className="flex justify-center mb-2">
                      {isCorrect ? (
                        <CheckCircle2 className="w-8 h-8 text-green-600" />
                      ) : (
                        <XCircle className="w-8 h-8 text-red-600" />
                      )}
                    </div>
                    <p className="font-bold text-lg text-gray-900">第 {index + 1} 題</p>
                    <p
                      className={`text-xs mt-2 font-semibold ${
                        isCorrect ? 'text-green-700' : 'text-red-700'
                      }`}
                    >
                      {isCorrect ? '✓ 正確' : '✗ 錯誤'}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex gap-6 mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span className="text-sm text-gray-700">正確答案</span>
              </div>
              <div className="flex items-center gap-2">
                <XCircle className="w-5 h-5 text-red-600" />
                <span className="text-sm text-gray-700">錯誤答案</span>
              </div>
            </div>
          </Card>

          {/* Detailed Answers */}
          <Card className="p-8 bg-white shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">詳細答案</h2>

            <div className="space-y-4">
              {questions.map((question, index) => {
                const userAnswer = answers[question.id];
                const isCorrect = userAnswer === question.correctAnswer;

                return (
                  <motion.div
                    key={question.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`p-4 rounded-lg border-l-4 ${
                      isCorrect
                        ? 'border-l-green-500 bg-green-50'
                        : 'border-l-red-500 bg-red-50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
                      )}
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 mb-2">
                          第 {index + 1} 題
                        </p>
                        <p className="text-sm text-gray-700 mb-3">{question.sentence}</p>
                        <div className="space-y-1 text-sm">
                          <p>
                            <span className="font-semibold text-gray-900">您的答案：</span>
                            <span
                              className={`ml-2 ${
                                isCorrect ? 'text-green-700' : 'text-red-700'
                              }`}
                            >
                              {userAnswer || '未作答'}
                            </span>
                          </p>
                          <p>
                            <span className="font-semibold text-gray-900">正確答案：</span>
                            <span className="ml-2 text-green-700">
                              {question.correctAnswer}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center flex-wrap">
            {onBackHome && (
              <Button
                onClick={onBackHome}
                variant="outline"
                className="flex items-center gap-2 font-semibold px-6 py-3"
              >
                <Home className="w-4 h-4" />
                返回首頁
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
