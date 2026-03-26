import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Trash2, Eye, EyeOff, Lock, Unlock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useQuizDataStorage } from '@/hooks/useQuizDataStorage';
import { useLocation } from 'wouter';

export default function AdminDashboard() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { records, exportToCSV, exportToJSON, clearAllRecords } = useQuizDataStorage();

  const handleLogin = () => {
    // Simple password check (in production, this should be more secure)
    if (password === 'gept2024') {
      setIsAuthenticated(true);
    } else {
      alert('密碼錯誤');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-md"
        >
          <Card className="p-8 bg-white shadow-lg">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-2xl">🔐</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">後台管理</h1>
              <p className="text-gray-600 mt-2">GEPT 詞彙測驗數據管理系統</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  管理員密碼
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                    placeholder="請輸入密碼"
                    className="pr-10"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-500"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button
                onClick={handleLogin}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
              >
                登入
              </Button>
            </div>

            <p className="text-xs text-gray-500 text-center mt-6">
              提示：密碼為 gept2024
            </p>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">📊</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">後台管理系統</h1>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Unlock className="w-4 h-4" />
              登出
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {/* Statistics */}
          <div className="grid md:grid-cols-4 gap-4">
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <p className="text-sm text-gray-600 mb-2">總測驗次數</p>
              <p className="text-3xl font-bold text-blue-600">{records.length}</p>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <p className="text-sm text-gray-600 mb-2">前測</p>
              <p className="text-3xl font-bold text-green-600">
                {records.filter(r => r.testType === 'pretest').length}
              </p>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <p className="text-sm text-gray-600 mb-2">立即後測</p>
              <p className="text-3xl font-bold text-purple-600">
                {records.filter(r => r.testType === 'immediate_posttest').length}
              </p>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
              <p className="text-sm text-gray-600 mb-2">平均成績</p>
              <p className="text-3xl font-bold text-orange-600">
                {records.length > 0
                  ? Math.round(records.reduce((sum, r) => sum + r.totalScore, 0) / records.length)
                  : 0}
              </p>
            </Card>
          </div>

          {/* Export Section */}
          <Card className="p-6 bg-white border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">數據導出</h2>
            <div className="flex gap-4 flex-wrap">
              <Button
                onClick={exportToCSV}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold"
              >
                <Download className="w-4 h-4" />
                導出為 CSV
              </Button>

              <Button
                onClick={exportToJSON}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
              >
                <Download className="w-4 h-4" />
                導出為 JSON
              </Button>

              <Button
                onClick={clearAllRecords}
                variant="destructive"
                className="flex items-center gap-2 ml-auto"
              >
                <Trash2 className="w-4 h-4" />
                清除所有記錄
              </Button>
            </div>
          </Card>

          {/* Records Table */}
          <Card className="p-6 bg-white border-gray-200 overflow-x-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">測驗記錄</h2>
            {records.length === 0 ? (
              <p className="text-gray-500 text-center py-8">暫無測驗記錄</p>
            ) : (
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className="px-4 py-2 text-left font-semibold text-gray-900">測驗時間</th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-900">進行時長</th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-900">學號</th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-900">姓名</th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-900">性別</th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-900">班級</th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-900">測驗類型</th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-900">正確/總數</th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-900">成績</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((record, index) => (
                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-4 py-2 text-gray-700">
                        {new Date(record.timestamp).toLocaleString('zh-TW')}
                      </td>
                      <td className="px-4 py-2 text-gray-700">{record.duration}秒</td>
                      <td className="px-4 py-2 text-gray-700">{record.studentId}</td>
                      <td className="px-4 py-2 text-gray-700">{record.studentName}</td>
                      <td className="px-4 py-2 text-gray-700">
                        {record.biologicalSex === 'male' ? '男' : '女'}
                      </td>
                      <td className="px-4 py-2 text-gray-700">{record.classType}</td>
                      <td className="px-4 py-2 text-gray-700">
                        {record.testType === 'pretest' ? '前測' : '立即後測'}
                      </td>
                      <td className="px-4 py-2 text-gray-700">
                        {record.correctAnswers}/{record.totalQuestions}
                      </td>
                      <td className="px-4 py-2">
                        <span
                          className={`px-3 py-1 rounded-full text-white font-semibold text-sm ${
                            record.totalScore >= 70
                              ? 'bg-green-600'
                              : record.totalScore >= 50
                              ? 'bg-yellow-600'
                              : 'bg-red-600'
                          }`}
                        >
                          {record.totalScore}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
