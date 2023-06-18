import { render, screen } from '@testing-library/react';
import { Login } from './pages/Login';

describe('Login', () => {
  test('render Login component', () => {
      render(<Login />);
    const emailInput = screen.getByRole('input', { name: /email/i});
    expect(emailInput).toBeInTheDocument();
    const passwordInput = screen.getByRole('input', { name: /password/i});
    expect(passwordInput).toBeInTheDocument();
  });
});
