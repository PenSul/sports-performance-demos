import React, { useState } from 'react';
import { Activity, FileText, Download, ChevronDown, Calendar, User, Printer, Share2, Check, Clock, Award, Target, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

function GeneratePerformanceReport() {
  const [selectedAthlete, setSelectedAthlete] = useState('Sarah Johnson');
  const [selectedPeriod, setSelectedPeriod] = useState('November 2025');
  const [reportType, setReportType] = useState('Comprehensive');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);

  const athletes = ['Sarah Johnson', 'Michael Chen', 'Emma Williams', 'James Rodriguez', 'Lisa Thompson'];
  const periods = ['November 2025', 'October 2025', 'Q4 2025', 'Q3 2025', 'Year 2025'];
  const reportTypes = ['Comprehensive', 'Summary', 'Training Focus', 'Competition Ready'];

  const performanceData = [
    { week: 'Week 1', score: 88, target: 85 },
    { week: 'Week 2', score: 90, target: 86 },
    { week: 'Week 3', score: 92, target: 87 },
    { week: 'Week 4', score: 94, target: 88 }
  ];

  const metricsData = [
    { metric: 'Speed', value: 91 },
    { metric: 'Endurance', value: 87 },
    { metric: 'Strength', value: 92 },
    { metric: 'Agility', value: 85 },
    { metric: 'Recovery', value: 82 }
  ];

  const handleGenerate = () => {
    setIsGenerating(true);
    setIsGenerated(false);
    setTimeout(() => {
      setIsGenerating(false);
      setIsGenerated(true);
    }, 2000);
  };

  const reportSummary = {
    athlete: selectedAthlete,
    sport: 'Track & Field',
    position: 'Sprinter',
    period: selectedPeriod,
    overallScore: 94,
    improvement: '+6.8%',
    trainingSessions: 24,
    trainingHours: 56,
    personalRecords: 3,
    goalsAchieved: '4/5'
  };

  const achievements = [
    { title: 'New 100m Personal Best', date: 'Nov 15, 2025', description: 'Achieved 10.82s in sprint trials' },
    { title: 'Endurance Milestone', date: 'Nov 10, 2025', description: 'Completed 5K under target time' },
    { title: 'Strength Goal Met', date: 'Nov 5, 2025', description: 'Reached 1.5x bodyweight squat' }
  ];

  const recommendations = [
    { priority: 'High', area: 'Recovery', recommendation: 'Increase rest days between high-intensity sessions' },
    { priority: 'Medium', area: 'Flexibility', recommendation: 'Add 15 min daily stretching routine' },
    { priority: 'Low', area: 'Nutrition', recommendation: 'Consider increasing protein intake by 10%' }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Performance Report Generator</h1>
              <p className="text-sm text-gray-500">Create detailed performance reports for athletes</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Report Configuration</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Athlete</label>
              <div className="relative">
                <select
                  value={selectedAthlete}
                  onChange={(e) => { setSelectedAthlete(e.target.value); setIsGenerated(false); }}
                  className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {athletes.map(athlete => <option key={athlete}>{athlete}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Report Period</label>
              <div className="relative">
                <select
                  value={selectedPeriod}
                  onChange={(e) => { setSelectedPeriod(e.target.value); setIsGenerated(false); }}
                  className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {periods.map(period => <option key={period}>{period}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
              <div className="relative">
                <select
                  value={reportType}
                  onChange={(e) => { setReportType(e.target.value); setIsGenerated(false); }}
                  className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {reportTypes.map(type => <option key={type}>{type}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>
            <div className="flex items-end">
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <FileText className="w-4 h-4" />
                    <span>Generate Report</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {isGenerated && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-blue-600 text-xl font-bold">
                      {reportSummary.athlete.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="text-white">
                      <h2 className="text-2xl font-bold">{reportSummary.athlete}</h2>
                      <p className="text-blue-100">{reportSummary.sport} - {reportSummary.position}</p>
                      <p className="text-blue-200 text-sm">{reportType} Report • {reportSummary.period}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="flex items-center space-x-1 bg-white bg-opacity-20 text-white px-3 py-2 rounded-lg hover:bg-opacity-30 transition-colors">
                      <Printer className="w-4 h-4" />
                      <span className="text-sm">Print</span>
                    </button>
                    <button className="flex items-center space-x-1 bg-white bg-opacity-20 text-white px-3 py-2 rounded-lg hover:bg-opacity-30 transition-colors">
                      <Download className="w-4 h-4" />
                      <span className="text-sm">Export PDF</span>
                    </button>
                    <button className="flex items-center space-x-1 bg-white bg-opacity-20 text-white px-3 py-2 rounded-lg hover:bg-opacity-30 transition-colors">
                      <Share2 className="w-4 h-4" />
                      <span className="text-sm">Share</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-gray-50 rounded-xl p-4 text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Target className="w-6 h-6 text-blue-600" />
                    </div>
                    <p className="text-3xl font-bold text-gray-800">{reportSummary.overallScore}</p>
                    <p className="text-sm text-gray-500">Overall Score</p>
                    <span className="inline-flex items-center text-green-600 text-sm font-medium mt-1">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {reportSummary.improvement}
                    </span>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Calendar className="w-6 h-6 text-green-600" />
                    </div>
                    <p className="text-3xl font-bold text-gray-800">{reportSummary.trainingSessions}</p>
                    <p className="text-sm text-gray-500">Training Sessions</p>
                    <span className="text-gray-400 text-sm mt-1">{reportSummary.trainingHours} hours total</span>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 text-center">
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Award className="w-6 h-6 text-amber-600" />
                    </div>
                    <p className="text-3xl font-bold text-gray-800">{reportSummary.personalRecords}</p>
                    <p className="text-sm text-gray-500">Personal Records</p>
                    <span className="text-gray-400 text-sm mt-1">This period</span>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Check className="w-6 h-6 text-purple-600" />
                    </div>
                    <p className="text-3xl font-bold text-gray-800">{reportSummary.goalsAchieved}</p>
                    <p className="text-sm text-gray-500">Goals Achieved</p>
                    <span className="text-gray-400 text-sm mt-1">80% success rate</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Performance Progression</h3>
                    <div className="h-64 bg-gray-50 rounded-xl p-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={performanceData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                          <XAxis dataKey="week" stroke="#9CA3AF" fontSize={12} />
                          <YAxis stroke="#9CA3AF" fontSize={12} domain={[80, 100]} />
                          <Tooltip />
                          <Line type="monotone" dataKey="target" stroke="#D1D5DB" strokeWidth={2} strokeDasharray="5 5" name="Target" />
                          <Line type="monotone" dataKey="score" stroke="#3B82F6" strokeWidth={3} dot={{ fill: '#3B82F6' }} name="Score" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Performance Metrics</h3>
                    <div className="h-64 bg-gray-50 rounded-xl p-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={metricsData} layout="vertical">
                          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                          <XAxis type="number" domain={[0, 100]} stroke="#9CA3AF" fontSize={12} />
                          <YAxis dataKey="metric" type="category" stroke="#9CA3AF" fontSize={12} width={80} />
                          <Tooltip />
                          <Bar dataKey="value" fill="#3B82F6" radius={[0, 4, 4, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Key Achievements</h3>
                    <div className="space-y-3">
                      {achievements.map((achievement, index) => (
                        <div key={index} className="flex items-start space-x-3 bg-green-50 rounded-lg p-4">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <Award className="w-4 h-4 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">{achievement.title}</p>
                            <p className="text-sm text-gray-600">{achievement.description}</p>
                            <p className="text-xs text-gray-400 mt-1">{achievement.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Recommendations</h3>
                    <div className="space-y-3">
                      {recommendations.map((rec, index) => (
                        <div key={index} className="flex items-start space-x-3 bg-gray-50 rounded-lg p-4">
                          <div className={`px-2 py-1 rounded text-xs font-medium ${
                            rec.priority === 'High' ? 'bg-red-100 text-red-700' :
                            rec.priority === 'Medium' ? 'bg-amber-100 text-amber-700' :
                            'bg-gray-200 text-gray-700'
                          }`}>
                            {rec.priority}
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">{rec.area}</p>
                            <p className="text-sm text-gray-600">{rec.recommendation}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <p>Report generated on November 30, 2025 at 2:30 PM</p>
                    <p>Sports Performance Analytics System • Team 30</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {!isGenerated && !isGenerating && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Report Generated</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Configure the report options above and click "Generate Report" to create a comprehensive performance report for the selected athlete.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default GeneratePerformanceReport;
