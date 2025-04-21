import { render, screen } from '@testing-library/react';
import App from './App';

test('renders doctor booking application', () => {
  render(<App />);
  const headingElement = screen.getByText(/book your doctor appointment/i);
  expect(headingElement).toBeInTheDocument();
});
