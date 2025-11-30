import React, { useState } from 'react';
import Demo1_AuthenticateUser from './components/Demo1_AuthenticateUser';
import Demo2_PerformanceDashboard from './components/Demo2_PerformanceDashboard';
import Demo3_ManageAthleteProfiles from './components/Demo3_ManageAthleteProfiles';
import Demo4_AnalyzePerformanceTrends from './components/Demo4_AnalyzePerformanceTrends';
import Demo5_GeneratePerformanceReport from './components/Demo5_GeneratePerformanceReport';

function App() {
  const [activeDemo, setActiveDemo] = useState(null);

  const demos = [
    { id: 1, name: 'UC15 - Authenticate User', component: Demo1_AuthenticateUser },
    { id: 2, name: 'UC5 - Performance Dashboard', component: Demo2_PerformanceDashboard },
    { id: 3, name: 'UC3 - Manage Athlete Profiles', component: Demo3_ManageAthleteProfiles },
    { id: 4, name: 'UC6 - Analyze Performance Trends', component: Demo4_AnalyzePerformanceTrends },
    { id: 5, name: 'UC13 - Generate Performance Report', component: Demo5_GeneratePerformanceReport },
  ];

  if (activeDemo) {
    const ActiveComponent = demos.find(d => d.id === activeDemo)?.component;
    return (
      <div>
        <div className="fixed top-4 left-4 z-50">
          <button
            onClick={() => setActiveDemo(null)}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-gray-700 transition-colors"
          >
            ← Back to Menu
          </button>
        </div>
        <ActiveComponent />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center p-8">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Sports Performance Analytics
          </h1>
          <p className="text-gray-500">Group 30 - Demo Components</p>
        </div>
        <div className="space-y-3">
          {demos.map((demo) => (
            <button
              key={demo.id}
              onClick={() => setActiveDemo(demo.id)}
              className="w-full text-left px-6 py-4 bg-gray-50 hover:bg-blue-50 rounded-xl border border-gray-200 hover:border-blue-300 transition-all group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium text-blue-600">Demo {demo.id}</span>
                  <p className="text-lg font-semibold text-gray-800 group-hover:text-blue-700">
                    {demo.name}
                  </p>
                </div>
                <span className="text-gray-400 group-hover:text-blue-500 text-2xl">→</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
