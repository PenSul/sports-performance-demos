import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { useState } from 'react';

// Simplified LoginForm component for testing
function LoginForm({ onLogin, onError }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validCredentials = {
    'coach@sports.com': { password: 'password123', role: 'Coach' },
    'athlete@sports.com': { password: 'password123', role: 'Athlete' },
    'analyst@sports.com': { password: 'password123', role: 'Analyst' }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    await new Promise(resolve => setTimeout(resolve, 100));

    const user = validCredentials[email];
    if (user && user.password === password) {
      onLogin?.({ email, role: user.role });
    } else {
      const errorMsg = 'Invalid email or password';
      setError(errorMsg);
      onError?.(errorMsg);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} data-testid="login-form">
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          data-testid="email-input"
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          data-testid="password-input"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          data-testid="toggle-password"
        >
          {showPassword ? 'Hide' : 'Show'}
        </button>
      </div>
      {error && <p data-testid="error-message" role="alert">{error}</p>}
      <button type="submit" disabled={loading} data-testid="submit-button">
        {loading ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
  );
}

describe('LoginForm Component', () => {
  it('should render all form elements', () => {
    render(<LoginForm />);

    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
    expect(screen.getByTestId('toggle-password')).toBeInTheDocument();
  });

  it('should update email input value on change', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    const emailInput = screen.getByTestId('email-input');
    await user.type(emailInput, 'test@example.com');

    expect(emailInput).toHaveValue('test@example.com');
  });

  it('should update password input value on change', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    const passwordInput = screen.getByTestId('password-input');
    await user.type(passwordInput, 'testpassword');

    expect(passwordInput).toHaveValue('testpassword');
  });

  it('should toggle password visibility', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    const passwordInput = screen.getByTestId('password-input');
    const toggleButton = screen.getByTestId('toggle-password');

    expect(passwordInput).toHaveAttribute('type', 'password');

    await user.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'text');

    await user.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  it('should call onLogin with user data on successful login', async () => {
    const user = userEvent.setup();
    const onLogin = vi.fn();
    render(<LoginForm onLogin={onLogin} />);

    await user.type(screen.getByTestId('email-input'), 'coach@sports.com');
    await user.type(screen.getByTestId('password-input'), 'password123');
    await user.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(onLogin).toHaveBeenCalledWith({
        email: 'coach@sports.com',
        role: 'Coach'
      });
    });
  });

  it('should display error message on invalid credentials', async () => {
    const user = userEvent.setup();
    const onError = vi.fn();
    render(<LoginForm onError={onError} />);

    await user.type(screen.getByTestId('email-input'), 'invalid@email.com');
    await user.type(screen.getByTestId('password-input'), 'wrongpassword');
    await user.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toHaveTextContent('Invalid email or password');
    });
  });

  it('should show loading state during submission', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(screen.getByTestId('email-input'), 'coach@sports.com');
    await user.type(screen.getByTestId('password-input'), 'password123');

    const submitButton = screen.getByTestId('submit-button');
    await user.click(submitButton);

    expect(submitButton).toHaveTextContent('Signing in...');
  });

  it('should disable submit button while loading', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(screen.getByTestId('email-input'), 'coach@sports.com');
    await user.type(screen.getByTestId('password-input'), 'password123');

    const submitButton = screen.getByTestId('submit-button');
    await user.click(submitButton);

    expect(submitButton).toBeDisabled();
  });
});
