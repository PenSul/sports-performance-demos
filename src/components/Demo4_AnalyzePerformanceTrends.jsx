import React, { useState } from 'react';
import { Activity, TrendingUp, TrendingDown, ChevronDown, Calendar, Target, Zap, Clock, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

function AnalyzePerformanceTrends() {
  const [selectedAthlete, setSelectedAthlete] = useState('Sarah Johnson');
  const [selectedMetric, setSelectedMetric] = useState('Overall Performance');
  const [selectedPeriod, setSelectedPeriod] = useState('Last 6 Months');

  const athletes = ['Sarah Johnson', 'Michael Chen', 'Emma Williams', 'James Rodriguez', 'Lisa Thompson'];
  const metrics = ['Overall Performance', 'Speed', 'Endurance', 'Strength', 'Agility', 'Recovery'];
  const periods = ['Last Month', 'Last 3 Months', 'Last 6 Months', 'Last Year'];

  const monthlyTrends = [
    { month: 'Jun', performance: 72, speed: 70, endurance: 68, strength: 75, target: 75 },
    { month: 'Jul', performance: 75, speed: 73, endurance: 71, strength: 78, target: 77 },
    { month: 'Aug', performance: 78, speed: 76, endurance: 74, strength: 80, target: 79 },
    { month: 'Sep', performance: 82, speed: 80, endurance: 78, strength: 84, target: 81 },
    { month: 'Oct', performance: 88, speed: 85, endurance: 82, strength: 88, target: 83 },
    { month: 'Nov', performance: 94, speed: 91, endurance: 87, strength: 92, target: 85 }
  ];

  const weeklyProgress = [
    { week: 'W1', hours: 12, sessions: 5, intensity: 72 },
    { week: 'W2', hours: 14, sessions: 6, intensity: 75 },
    { week: 'W3', hours: 13, sessions: 5, intensity: 78 },
    { week: 'W4', hours: 16, sessions: 7, intensity: 82 }
  ];

  const skillRadar = [
    { skill: 'Speed', current: 91, previous: 85 },
    { skill: 'Endurance', current: 87, previous: 78 },
    { skill: 'Strength', current: 92, previous: 88 },
    { skill: 'Agility', current: 85, previous: 80 },
    { skill: 'Flexibility', current: 78, previous: 72 },
    { skill: 'Recovery', current: 82, previous: 75 }
  ];

  const performanceInsights = [
    { label: 'Current Score', value: 94, change: '+6', trend: 'up', color: 'text-green-600' },
    { label: 'Peak Performance', value: 96, change: 'Oct 28', trend: 'neutral', color: 'text-blue-600' },
    { label: 'Avg Training Load', value: 82, change: '+12%', trend: 'up', color: 'text-green-600' },
    { label: 'Recovery Rate', value: 88, change: '+5%', trend: 'up', color: 'text-green-600' }
  ];

  const trendAnalysis = [
    { category: 'Sprint Performance', current: 94, previous: 88, change: 6.8, status: 'improving' },
    { category: 'Endurance Capacity', current: 87, previous: 78, change: 11.5, status: 'improving' },
    { category: 'Strength Metrics', current: 92, previous: 88, change: 4.5, status: 'improving' },
    { category: 'Reaction Time', current: 85, previous: 82, change: 3.7, status: 'stable' },
    { category: 'Flexibility Score', current: 78, previous: 72, change: 8.3, status: 'improving' }
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
              <h1 className="text-xl font-bold text-gray-800">Performance Trend Analysis</h1>
              <p className="text-sm text-gray-500">Track and analyze athlete performance over time</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="relative">
            <select
              value={selectedAthlete}
              onChange={(e) => setSelectedAthlete(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {athletes.map(athlete => <option key={athlete}>{athlete}</option>)}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
          <div className="relative">
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {metrics.map(metric => <option key={metric}>{metric}</option>)}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
          <div className="relative">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {periods.map(period => <option key={period}>{period}</option>)}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {performanceInsights.map((insight, index) => (
            <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
              <p className="text-sm text-gray-500 mb-1">{insight.label}</p>
              <div className="flex items-end justify-between">
                <span className="text-2xl font-bold text-gray-800">{insight.value}</span>
                <div className={`flex items-center ${insight.color}`}>
                  {insight.trend === 'up' && <ArrowUpRight className="w-4 h-4" />}
                  {insight.trend === 'down' && <ArrowDownRight className="w-4 h-4" />}
                  <span className="text-sm font-medium">{insight.change}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 bg-white rounded-xl p-5 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Performance Trend</h3>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-600">Performance</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                  <span className="text-gray-600">Target</span>
                </div>
              </div>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyTrends}>
                  <defs>
                    <linearGradient id="colorPerformance" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="month" stroke="#9CA3AF" fontSize={12} />
                  <YAxis stroke="#9CA3AF" fontSize={12} domain={[60, 100]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="target" stroke="#D1D5DB" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                  <Area type="monotone" dataKey="performance" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorPerformance)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Skills Comparison</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={skillRadar}>
                  <PolarGrid stroke="#E5E7EB" />
                  <PolarAngleAxis dataKey="skill" tick={{ fontSize: 11, fill: '#6B7280' }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} />
                  <Radar name="Current" dataKey="current" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.4} />
                  <Radar name="Previous" dataKey="previous" stroke="#9CA3AF" fill="#9CA3AF" fillOpacity={0.2} />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Weekly Training Load</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyProgress}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="week" stroke="#9CA3AF" fontSize={12} />
                  <YAxis stroke="#9CA3AF" fontSize={12} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="hours" name="Training Hours" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="sessions" name="Sessions" fill="#10B981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Trend Analysis Summary</h3>
            <div className="space-y-4">
              {trendAnalysis.map((item, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{item.category}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-sm text-gray-500">Previous: {item.previous}</span>
                      <span className="text-gray-300">→</span>
                      <span className="text-sm font-medium text-gray-700">Current: {item.current}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-sm font-medium ${
                      item.status === 'improving' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {item.status === 'improving' ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                      <span>+{item.change}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Zap className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-blue-800">Performance Insight</p>
                    <p className="text-sm text-blue-600 mt-1">
                      {selectedAthlete} has shown consistent improvement across all metrics over the past 6 months, with endurance capacity showing the highest growth at 11.5%.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AnalyzePerformanceTrends;
