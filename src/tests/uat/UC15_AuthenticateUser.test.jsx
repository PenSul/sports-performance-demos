import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { useState } from 'react';

/**
 * UC15 - Authenticate User
 *
 * Primary Actor: User (Coach, Athlete, or Performance Analyst)
 * Goal: Securely log into the Sports Performance Analytics System
 *
 * Preconditions:
 * - User has valid system credentials
 * - System is operational and accessible
 *
 * Main Success Scenario:
 * 1. User navigates to login page
 * 2. User enters email address
 * 3. User enters password
 * 4. User clicks Sign In button
 * 5. System validates credentials
 * 6. System grants access based on user role
 * 7. User is redirected to appropriate dashboard
 *
 * Alternative Flows:
 * A1. Invalid credentials - Error message displayed
 * A2. Empty fields - Validation message displayed
 */

// Full Authentication Demo Component
function AuthenticateUserDemo() {
  const [currentUser, setCurrentUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const users = {
    'coach@sports.com': { password: 'password123', role: 'Coach', name: 'John Coach' },
    'athlete@sports.com': { password: 'password123', role: 'Athlete', name: 'Jane Athlete' },
    'analyst@sports.com': { password: 'password123', role: 'Analyst', name: 'Bob Analyst' }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));

    const user = users[email];
    if (user && user.password === password) {
      setCurrentUser({ email, role: user.role, name: user.name });
    } else {
      setError('Invalid email or password');
    }
    setIsLoading(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setEmail('');
    setPassword('');
  };

  if (currentUser) {
    return (
      <div data-testid="authenticated-dashboard" className="min-h-screen bg-gray-100 p-8">
        <header data-testid="dashboard-header" className="bg-white shadow rounded-lg p-4 mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold" data-testid="welcome-message">
              Welcome, {currentUser.name}!
            </h1>
            <p className="text-gray-600" data-testid="user-role-display">
              Role: {currentUser.role}
            </p>
          </div>
          <button
            onClick={handleLogout}
            data-testid="logout-button"
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Sign Out
          </button>
        </header>
        <main data-testid="dashboard-content">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">{currentUser.role} Dashboard</h2>
            {currentUser.role === 'Coach' && (
              <div data-testid="coach-dashboard">
                <p>Access to team management, athlete profiles, and training plans.</p>
              </div>
            )}
            {currentUser.role === 'Athlete' && (
              <div data-testid="athlete-dashboard">
                <p>Access to personal performance data and training schedules.</p>
              </div>
            )}
            {currentUser.role === 'Analyst' && (
              <div data-testid="analyst-dashboard">
                <p>Access to analytics tools, reports, and trend analysis.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div data-testid="login-page" className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800" data-testid="login-title">
            Sports Performance Analytics
          </h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        <form onSubmit={handleLogin} data-testid="login-form">
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              data-testid="email-input"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                data-testid="password-input"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                data-testid="toggle-password-button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          {error && (
            <div data-testid="error-message" className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            data-testid="login-button"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}

describe('UC15 - Authenticate User', () => {
  describe('Preconditions', () => {
    it('should display login page when system is accessed', () => {
      render(<AuthenticateUserDemo />);

      expect(screen.getByTestId('login-page')).toBeInTheDocument();
      expect(screen.getByTestId('login-title')).toHaveTextContent('Sports Performance Analytics');
    });

    it('should have login form with required fields', () => {
      render(<AuthenticateUserDemo />);

      expect(screen.getByTestId('login-form')).toBeInTheDocument();
      expect(screen.getByTestId('email-input')).toBeInTheDocument();
      expect(screen.getByTestId('password-input')).toBeInTheDocument();
      expect(screen.getByTestId('login-button')).toBeInTheDocument();
    });
  });

  describe('Main Success Scenario - Coach Login', () => {
    it('Step 1-4: Coach enters credentials and clicks Sign In', async () => {
      const user = userEvent.setup();
      render(<AuthenticateUserDemo />);

      await user.type(screen.getByTestId('email-input'), 'coach@sports.com');
      await user.type(screen.getByTestId('password-input'), 'password123');

      expect(screen.getByTestId('email-input')).toHaveValue('coach@sports.com');
      expect(screen.getByTestId('password-input')).toHaveValue('password123');
    });

    it('Step 5-7: System validates and redirects Coach to dashboard', async () => {
      const user = userEvent.setup();
      render(<AuthenticateUserDemo />);

      await user.type(screen.getByTestId('email-input'), 'coach@sports.com');
      await user.type(screen.getByTestId('password-input'), 'password123');
      await user.click(screen.getByTestId('login-button'));

      await waitFor(() => {
        expect(screen.getByTestId('authenticated-dashboard')).toBeInTheDocument();
        expect(screen.getByTestId('welcome-message')).toHaveTextContent('Welcome, John Coach!');
        expect(screen.getByTestId('user-role-display')).toHaveTextContent('Role: Coach');
        expect(screen.getByTestId('coach-dashboard')).toBeInTheDocument();
      });
    });
  });

  describe('Main Success Scenario - Athlete Login', () => {
    it('should authenticate Athlete and show Athlete dashboard', async () => {
      const user = userEvent.setup();
      render(<AuthenticateUserDemo />);

      await user.type(screen.getByTestId('email-input'), 'athlete@sports.com');
      await user.type(screen.getByTestId('password-input'), 'password123');
      await user.click(screen.getByTestId('login-button'));

      await waitFor(() => {
        expect(screen.getByTestId('authenticated-dashboard')).toBeInTheDocument();
        expect(screen.getByTestId('welcome-message')).toHaveTextContent('Welcome, Jane Athlete!');
        expect(screen.getByTestId('user-role-display')).toHaveTextContent('Role: Athlete');
        expect(screen.getByTestId('athlete-dashboard')).toBeInTheDocument();
      });
    });
  });

  describe('Main Success Scenario - Analyst Login', () => {
    it('should authenticate Analyst and show Analyst dashboard', async () => {
      const user = userEvent.setup();
      render(<AuthenticateUserDemo />);

      await user.type(screen.getByTestId('email-input'), 'analyst@sports.com');
      await user.type(screen.getByTestId('password-input'), 'password123');
      await user.click(screen.getByTestId('login-button'));

      await waitFor(() => {
        expect(screen.getByTestId('authenticated-dashboard')).toBeInTheDocument();
        expect(screen.getByTestId('welcome-message')).toHaveTextContent('Welcome, Bob Analyst!');
        expect(screen.getByTestId('user-role-display')).toHaveTextContent('Role: Analyst');
        expect(screen.getByTestId('analyst-dashboard')).toBeInTheDocument();
      });
    });
  });

  describe('Alternative Flow A1 - Invalid Credentials', () => {
    it('should display error for invalid email', async () => {
      const user = userEvent.setup();
      render(<AuthenticateUserDemo />);

      await user.type(screen.getByTestId('email-input'), 'wrong@email.com');
      await user.type(screen.getByTestId('password-input'), 'password123');
      await user.click(screen.getByTestId('login-button'));

      await waitFor(() => {
        expect(screen.getByTestId('error-message')).toHaveTextContent('Invalid email or password');
        expect(screen.getByTestId('login-page')).toBeInTheDocument();
      });
    });

    it('should display error for invalid password', async () => {
      const user = userEvent.setup();
      render(<AuthenticateUserDemo />);

      await user.type(screen.getByTestId('email-input'), 'coach@sports.com');
      await user.type(screen.getByTestId('password-input'), 'wrongpassword');
      await user.click(screen.getByTestId('login-button'));

      await waitFor(() => {
        expect(screen.getByTestId('error-message')).toHaveTextContent('Invalid email or password');
      });
    });
  });

  describe('Alternative Flow A2 - Empty Fields', () => {
    it('should display validation error for empty email', async () => {
      const user = userEvent.setup();
      render(<AuthenticateUserDemo />);

      await user.type(screen.getByTestId('password-input'), 'password123');
      await user.click(screen.getByTestId('login-button'));

      await waitFor(() => {
        expect(screen.getByTestId('error-message')).toHaveTextContent('Please enter both email and password');
      });
    });

    it('should display validation error for empty password', async () => {
      const user = userEvent.setup();
      render(<AuthenticateUserDemo />);

      await user.type(screen.getByTestId('email-input'), 'coach@sports.com');
      await user.click(screen.getByTestId('login-button'));

      await waitFor(() => {
        expect(screen.getByTestId('error-message')).toHaveTextContent('Please enter both email and password');
      });
    });
  });

  describe('Password Visibility Toggle', () => {
    it('should toggle password visibility when button is clicked', async () => {
      const user = userEvent.setup();
      render(<AuthenticateUserDemo />);

      const passwordInput = screen.getByTestId('password-input');
      const toggleButton = screen.getByTestId('toggle-password-button');

      expect(passwordInput).toHaveAttribute('type', 'password');
      expect(toggleButton).toHaveTextContent('Show');

      await user.click(toggleButton);

      expect(passwordInput).toHaveAttribute('type', 'text');
      expect(toggleButton).toHaveTextContent('Hide');

      await user.click(toggleButton);

      expect(passwordInput).toHaveAttribute('type', 'password');
    });
  });

  describe('Logout Functionality', () => {
    it('should return to login page when user logs out', async () => {
      const user = userEvent.setup();
      render(<AuthenticateUserDemo />);

      await user.type(screen.getByTestId('email-input'), 'coach@sports.com');
      await user.type(screen.getByTestId('password-input'), 'password123');
      await user.click(screen.getByTestId('login-button'));

      await waitFor(() => {
        expect(screen.getByTestId('authenticated-dashboard')).toBeInTheDocument();
      });

      await user.click(screen.getByTestId('logout-button'));

      await waitFor(() => {
        expect(screen.getByTestId('login-page')).toBeInTheDocument();
        expect(screen.queryByTestId('authenticated-dashboard')).not.toBeInTheDocument();
      });
    });

    it('should clear form fields after logout', async () => {
      const user = userEvent.setup();
      render(<AuthenticateUserDemo />);

      await user.type(screen.getByTestId('email-input'), 'coach@sports.com');
      await user.type(screen.getByTestId('password-input'), 'password123');
      await user.click(screen.getByTestId('login-button'));

      await waitFor(() => {
        expect(screen.getByTestId('authenticated-dashboard')).toBeInTheDocument();
      });

      await user.click(screen.getByTestId('logout-button'));

      await waitFor(() => {
        expect(screen.getByTestId('email-input')).toHaveValue('');
        expect(screen.getByTestId('password-input')).toHaveValue('');
      });
    });
  });

  describe('Postconditions', () => {
    it('should maintain authenticated state until logout', async () => {
      const user = userEvent.setup();
      render(<AuthenticateUserDemo />);

      await user.type(screen.getByTestId('email-input'), 'coach@sports.com');
      await user.type(screen.getByTestId('password-input'), 'password123');
      await user.click(screen.getByTestId('login-button'));

      await waitFor(() => {
        expect(screen.getByTestId('authenticated-dashboard')).toBeInTheDocument();
      });

      expect(screen.getByTestId('logout-button')).toBeInTheDocument();
      expect(screen.queryByTestId('login-form')).not.toBeInTheDocument();
    });
  });
});
