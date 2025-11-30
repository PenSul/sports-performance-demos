import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { useState } from 'react';

// Simulated Authentication System
function AuthenticationSystem() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  const validUsers = {
    'coach@sports.com': { password: 'password123', role: 'Coach', name: 'John Coach' },
    'athlete@sports.com': { password: 'password123', role: 'Athlete', name: 'Jane Athlete' },
    'analyst@sports.com': { password: 'password123', role: 'Analyst', name: 'Bob Analyst' }
  };

  const handleLogin = async (email, password) => {
    setError('');
    const userData = validUsers[email];

    if (userData && userData.password === password) {
      setUser({ email, role: userData.role, name: userData.name });
      return true;
    } else {
      setError('Invalid credentials');
      return false;
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (user) {
    return (
      <div data-testid="dashboard">
        <header data-testid="header">
          <span data-testid="user-name">Welcome, {user.name}</span>
          <span data-testid="user-role">{user.role}</span>
          <button data-testid="logout-button" onClick={handleLogout}>
            Sign Out
          </button>
        </header>
        <main data-testid="main-content">
          <h1>Dashboard</h1>
          {user.role === 'Coach' && <div data-testid="coach-features">Coach Tools</div>}
          {user.role === 'Athlete' && <div data-testid="athlete-features">Athlete Profile</div>}
          {user.role === 'Analyst' && <div data-testid="analyst-features">Analytics Tools</div>}
        </main>
      </div>
    );
  }

  return (
    <div data-testid="login-page">
      <form
        data-testid="login-form"
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          await handleLogin(formData.get('email'), formData.get('password'));
        }}
      >
        <input name="email" type="email" data-testid="email-input" placeholder="Email" />
        <input name="password" type="password" data-testid="password-input" placeholder="Password" />
        {error && <p data-testid="error-message">{error}</p>}
        <button type="submit" data-testid="login-button">Sign In</button>
      </form>
    </div>
  );
}

describe('Authentication System Integration', () => {
  describe('Login Flow', () => {
    it('should display login page initially', () => {
      render(<AuthenticationSystem />);

      expect(screen.getByTestId('login-page')).toBeInTheDocument();
      expect(screen.queryByTestId('dashboard')).not.toBeInTheDocument();
    });

    it('should successfully authenticate Coach and show dashboard', async () => {
      const user = userEvent.setup();
      render(<AuthenticationSystem />);

      await user.type(screen.getByTestId('email-input'), 'coach@sports.com');
      await user.type(screen.getByTestId('password-input'), 'password123');
      await user.click(screen.getByTestId('login-button'));

      await waitFor(() => {
        expect(screen.getByTestId('dashboard')).toBeInTheDocument();
        expect(screen.getByTestId('user-name')).toHaveTextContent('Welcome, John Coach');
        expect(screen.getByTestId('user-role')).toHaveTextContent('Coach');
      });
    });

    it('should show Coach-specific features after login', async () => {
      const user = userEvent.setup();
      render(<AuthenticationSystem />);

      await user.type(screen.getByTestId('email-input'), 'coach@sports.com');
      await user.type(screen.getByTestId('password-input'), 'password123');
      await user.click(screen.getByTestId('login-button'));

      await waitFor(() => {
        expect(screen.getByTestId('coach-features')).toBeInTheDocument();
        expect(screen.queryByTestId('athlete-features')).not.toBeInTheDocument();
        expect(screen.queryByTestId('analyst-features')).not.toBeInTheDocument();
      });
    });

    it('should show Athlete-specific features after login', async () => {
      const user = userEvent.setup();
      render(<AuthenticationSystem />);

      await user.type(screen.getByTestId('email-input'), 'athlete@sports.com');
      await user.type(screen.getByTestId('password-input'), 'password123');
      await user.click(screen.getByTestId('login-button'));

      await waitFor(() => {
        expect(screen.getByTestId('athlete-features')).toBeInTheDocument();
        expect(screen.queryByTestId('coach-features')).not.toBeInTheDocument();
      });
    });

    it('should show Analyst-specific features after login', async () => {
      const user = userEvent.setup();
      render(<AuthenticationSystem />);

      await user.type(screen.getByTestId('email-input'), 'analyst@sports.com');
      await user.type(screen.getByTestId('password-input'), 'password123');
      await user.click(screen.getByTestId('login-button'));

      await waitFor(() => {
        expect(screen.getByTestId('analyst-features')).toBeInTheDocument();
      });
    });

    it('should show error message for invalid credentials', async () => {
      const user = userEvent.setup();
      render(<AuthenticationSystem />);

      await user.type(screen.getByTestId('email-input'), 'wrong@email.com');
      await user.type(screen.getByTestId('password-input'), 'wrongpassword');
      await user.click(screen.getByTestId('login-button'));

      await waitFor(() => {
        expect(screen.getByTestId('error-message')).toHaveTextContent('Invalid credentials');
        expect(screen.getByTestId('login-page')).toBeInTheDocument();
      });
    });
  });

  describe('Logout Flow', () => {
    it('should return to login page after logout', async () => {
      const user = userEvent.setup();
      render(<AuthenticationSystem />);

      await user.type(screen.getByTestId('email-input'), 'coach@sports.com');
      await user.type(screen.getByTestId('password-input'), 'password123');
      await user.click(screen.getByTestId('login-button'));

      await waitFor(() => {
        expect(screen.getByTestId('dashboard')).toBeInTheDocument();
      });

      await user.click(screen.getByTestId('logout-button'));

      await waitFor(() => {
        expect(screen.getByTestId('login-page')).toBeInTheDocument();
        expect(screen.queryByTestId('dashboard')).not.toBeInTheDocument();
      });
    });
  });
});
