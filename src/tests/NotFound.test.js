import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Testa o componente NotFound.js', () => {
  it('deve conter um heading h2 com o texto "Page requested not found"', () => {
    render(<NotFound />);
    const pageTitle = screen.getByText(/Page requested not found/i);

    expect(pageTitle).toBeInTheDocument();
  });

  it('deve conter a imagem específica', () => {
    render(<NotFound />);
    const image = screen
      .getByAltText('Pikachu crying because the page requested was not found');

    expect(image)
      .toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  }); // https://testing-library.com/docs/queries/byalttext
});
