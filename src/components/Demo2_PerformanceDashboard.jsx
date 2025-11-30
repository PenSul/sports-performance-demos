import React, { useState } from 'react';
import { Activity, Users, TrendingUp, Award, Calendar, Clock, ChevronDown, Bell } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

function PerformanceDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('This Week');
  const [selectedTeam, setSelectedTeam] = useState('All Athletes');

  const weeklyPerformance = [
    { day: 'Mon', performance: 78, target: 80 },
    { day: 'Tue', performance: 82, target: 80 },
    { day: 'Wed', performance: 75, target: 80 },
    { day: 'Thu', performance: 88, target: 80 },
    { day: 'Fri', performance: 92, target: 80 },
    { day: 'Sat', performance: 85, target: 80 },
    { day: 'Sun', performance: 79, target: 80 }
  ];

  const athleteMetrics = [
    { name: 'Speed', value: 85, color: '#3B82F6' },
    { name: 'Endurance', value: 72, color: '#10B981' },
    { name: 'Strength', value: 90, color: '#F59E0B' },
    { name: 'Agility', value: 78, color: '#8B5CF6' }
  ];

  const trainingDistribution = [
    { name: 'Cardio', value: 30, color: '#3B82F6' },
    { name: 'Strength', value: 25, color: '#10B981' },
    { name: 'Flexibility', value: 20, color: '#F59E0B' },
    { name: 'Skills', value: 25, color: '#8B5CF6' }
  ];

  const recentActivities = [
    { athlete: 'Sarah Johnson', activity: 'Completed sprint training', time: '2 hours ago', improvement: '+5%' },
    { athlete: 'Michael Chen', activity: 'New personal record in deadlift', time: '4 hours ago', improvement: '+12%' },
    { athlete: 'Emma Williams', activity: 'Finished endurance session', time: '5 hours ago', improvement: '+3%' },
    { athlete: 'James Rodriguez', activity: 'Recovery session completed', time: '6 hours ago', improvement: null }
  ];

  const topPerformers = [
    { name: 'Sarah Johnson', sport: 'Track & Field', score: 94, trend: 'up' },
    { name: 'Michael Chen', sport: 'Weightlifting', score: 91, trend: 'up' },
    { name: 'Emma Williams', sport: 'Swimming', score: 88, trend: 'stable' }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Performance Dashboard</h1>
                <p className="text-sm text-gray-500">Sports Performance Analytics</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-blue-600">JM</span>
                </div>
                <span className="text-sm font-medium text-gray-700">Coach Mitchell</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Welcome back, Coach!</h2>
            <p className="text-gray-500">Here's what's happening with your athletes today.</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <select
                value={selectedTeam}
                onChange={(e) => setSelectedTeam(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>All Athletes</option>
                <option>Track Team</option>
                <option>Swimming Team</option>
                <option>Weightlifting</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
            <div className="relative">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>This Week</option>
                <option>This Month</option>
                <option>Last 3 Months</option>
                <option>This Year</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">+12%</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">24</p>
            <p className="text-sm text-gray-500">Active Athletes</p>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">+8%</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">84%</p>
            <p className="text-sm text-gray-500">Avg Performance</p>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-amber-600" />
              </div>
              <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-full">Today</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">18</p>
            <p className="text-sm text-gray-500">Sessions Completed</p>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Award className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded-full">New</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">7</p>
            <p className="text-sm text-gray-500">Personal Records</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 bg-white rounded-xl p-5 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Weekly Performance Overview</h3>
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
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyPerformance}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="day" stroke="#9CA3AF" fontSize={12} />
                  <YAxis stroke="#9CA3AF" fontSize={12} domain={[60, 100]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="target" stroke="#D1D5DB" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                  <Line type="monotone" dataKey="performance" stroke="#3B82F6" strokeWidth={3} dot={{ fill: '#3B82F6', strokeWidth: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Training Distribution</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={trainingDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {trainingDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {trainingDistribution.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm text-gray-600">{item.name} ({item.value}%)</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activities</h3>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-medium text-gray-600">
                      {activity.athlete.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800">{activity.athlete}</p>
                    <p className="text-sm text-gray-500">{activity.activity}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-400">{activity.time}</span>
                      {activity.improvement && (
                        <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                          {activity.improvement}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Performers</h3>
            <div className="space-y-4">
              {topPerformers.map((performer, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">{performer.name}</p>
                    <p className="text-xs text-gray-500">{performer.sport}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-800">{performer.score}</p>
                    <div className="flex items-center justify-end">
                      <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                      <span className="text-xs text-green-500">Improving</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Team Metrics</h4>
              <div className="space-y-3">
                {athleteMetrics.map((metric, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-600">{metric.name}</span>
                      <span className="text-sm font-medium text-gray-800">{metric.value}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${metric.value}%`, backgroundColor: metric.color }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default PerformanceDashboard;
