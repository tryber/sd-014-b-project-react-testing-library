import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

beforeEach(() => renderWithRouter(<NotFound />));

describe('Testa o componente <NotFound.js />', () => {
  test('Página contém um heading h2 com o texto Page requested not found 😭', () => {
    const noMatch = screen.getByRole('heading', {
      level: 2,
      name: 'Page requested not found Crying emoji',
    });
    expect(noMatch).toBeInTheDocument();
  });

  test('Página mostra a imagem "https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif"', () => {
    const img = screen.getByAltText(/Pikachu crying because/);
    expect(img).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
