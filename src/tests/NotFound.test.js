import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from './services/renderWithRouter';

describe('Testa o componente "NotFound.js"', () => {
  it('Deveria  renderizar o título da página', () => {
    renderWithRouter(<NotFound />);

    const heading = screen.getByRole('heading', {
      level: 2,
      name: 'Page requested not found Crying emoji',
    });

    expect(heading).toBeInTheDocument();
  });

  it('Deveria renderizar a imagem de um Pikachu chorando', () => {
    renderWithRouter(<NotFound />);

    const pikachuGif = screen.getByAltText(
      'Pikachu crying because the page requested was not found',
    );

    expect(pikachuGif).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
