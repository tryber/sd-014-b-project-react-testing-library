import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../uteis/renderWithRouter';
import App from '../App';

describe('Testa o componente app', () => {
  test('se o link "Home" aparece na tela', () => {
    renderWithRouter(<App />);
    const textHome = screen.getByText('Home');
    expect(textHome).toBeInTheDocument();
  });
});
