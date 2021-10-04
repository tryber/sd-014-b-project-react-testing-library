import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente NotFound', () => {
  test('a pagina deve conter un h2 com o text Page requested not found 😭', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/notfound');
    const h2 = screen.getByRole('heading', {
      level: 2, name: 'Page requested not found Crying emoji' });
    expect(h2).toBeInTheDocument();
  });

  test('deve conter um gif especifico', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/notfound');
    const altText = 'Pikachu crying because the page requested was not found';
    const gif = screen.getByAltText(altText);
    expect(gif).toBeInTheDocument();
    expect(gif).toHaveAttribute('src',
      'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
