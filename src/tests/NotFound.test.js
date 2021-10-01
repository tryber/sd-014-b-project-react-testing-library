import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('Teste o componente <NotFound.js />', () => {
  test(`Teste se página contém um heading h2 com o texto
    Page requested not found`, () => {
    renderWithRouter(<NotFound />);
    const notFoundTitle = screen.getByRole('heading', {
      level: 2,
      name: 'Page requested not found Crying emoji',
    });
    expect(notFoundTitle).toBeInTheDocument();
  });

  test('Teste se página mostra a imagem correspondente', () => {
    renderWithRouter(<NotFound />);
    const imgSrc = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const imgNotFound = screen.getByRole('img', {
      name: 'Pikachu crying because the page requested was not found',
    });
    expect(imgNotFound).toHaveAttribute('src', imgSrc);
  });
});
