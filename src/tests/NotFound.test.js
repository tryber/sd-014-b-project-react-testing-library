import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import { NotFound } from '../components';

describe('', () => {
  it('Verifica se contém o texto: Page requested not found 😭', () => {
    renderWithRouter(<NotFound />);
    const notFoundText = screen.getByRole('heading', {
      level: 2,
    });
    expect(notFoundText).toHaveTextContent('Page requested not found');
    expect(notFoundText).toBeInTheDocument();
  });

  it('Verifica se a imagem do Pikachu chorando aparece', () => {
    renderWithRouter(<NotFound />);
    const cryingPikachu = screen.getByAltText(
      'Pikachu crying because the page requested was not found',
    );
    expect(cryingPikachu).toHaveAttribute('src',
      'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
