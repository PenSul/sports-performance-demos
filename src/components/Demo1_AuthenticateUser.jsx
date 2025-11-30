import React, { useState } from 'react';
import { Eye, EyeOff, User, Lock, Activity } from 'lucide-react';

function AuthenticateUser() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [userRole, setUserRole] = useState('coach');

  const mockUsers = [
    { email: 'coach@sports.com', password: 'password123', name: 'John Mitchell', role: 'Coach' },
    { email: 'athlete@sports.com', password: 'password123', name: 'Sarah Johnson', role: 'Athlete' },
    { email: 'analyst@sports.com', password: 'password123', name: 'Michael Chen', role: 'Performance Analyst' }
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      const user = mockUsers.find(u => u.email === email && u.password === password);
      if (user) {
        setIsAuthenticated(true);
        setUserRole(user.role);
      } else {
        setError('Invalid email or password. Please try again.');
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setEmail('');
    setPassword('');
    setError('');
  };

  if (isAuthenticated) {
    const user = mockUsers.find(u => u.email === email);
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <User className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back!</h2>
          <p className="text-gray-600 mb-1">{user?.name}</p>
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
            {user?.role}
          </span>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600">You have successfully authenticated to the Sports Performance Analytics System.</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full py-3 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Activity className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Sports Performance</h1>
          <p className="text-gray-500">Analytics System</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full pl-11 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center mb-3">Demo Credentials:</p>
          <div className="space-y-2 text-xs text-gray-600">
            <div className="flex justify-between bg-gray-50 px-3 py-2 rounded">
              <span>Coach:</span>
              <span className="font-mono">coach@sports.com</span>
            </div>
            <div className="flex justify-between bg-gray-50 px-3 py-2 rounded">
              <span>Athlete:</span>
              <span className="font-mono">athlete@sports.com</span>
            </div>
            <div className="flex justify-between bg-gray-50 px-3 py-2 rounded">
              <span>Analyst:</span>
              <span className="font-mono">analyst@sports.com</span>
            </div>
            <p className="text-center text-gray-400 mt-2">Password: password123</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthenticateUser;
