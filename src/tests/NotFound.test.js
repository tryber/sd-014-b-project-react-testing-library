import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('Requisito 4 - Not found page', () => {
  test('Se a página contém um h2 com o texto Page requested not found 😭', () => {
    renderWithRouter(<NotFound />);

    const notFoundText = screen.getByRole('heading', {
      level: 2, name: 'Page requested not found Crying emoji' });
    expect(notFoundText).toBeInTheDocument();
  });

  test('Verifica se a página contém a imagem do link', () => {
    renderWithRouter(<NotFound />);
    const notFoundImage = screen.getByAltText(/Pikachu crying because the page requeste/);
    expect(notFoundImage).toHaveAttribute('src',
      'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
