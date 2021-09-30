import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import { NotFound } from '../components';

describe('4 - Testa o componente NotFound.js ', () => {
  test('Verifica se a página contém um h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);

    const elementHeadingPageNotFound = screen.getByRole('heading', {
      level: 2,
      name: /page requested not found/i,
    });
    expect(elementHeadingPageNotFound).toBeInTheDocument();
  });

  test('Verifica se a página mostra o gif com o Pikachu', () => {
    renderWithRouter(<NotFound />);

    const imagePikachuNotFound = screen.getByRole('img', {
      name: 'Pikachu crying because the page requested was not found',
    });

    const UrlImagePikachuNotFound = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(imagePikachuNotFound).toBeInTheDocument();
    expect(imagePikachuNotFound).toHaveAttribute('src', UrlImagePikachuNotFound);
  });
});
