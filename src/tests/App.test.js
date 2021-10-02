import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('Testa o componente app', () => {
  test('Testa o link', () => {
    render(<App />);
    const textHome = screen.getByText('Home');
    expect(textHome).toBeInTheDocument();
  });
});
