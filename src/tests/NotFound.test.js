import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../renderWithRouter';

describe('verifica se contém um heading e uma imagem', () => {
  it('deveria exibir um heading "h2" com texto "Page requested not found"', () => {
    render(<NotFound />);
    const textTitle = screen.getByText(/Page requested not found/i);
    expect(textTitle).toBeInTheDocument();
  });
  it('deveria exibir a imagem da url: https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    renderWithRouter(<NotFound />);
    const image = screen.getByAltText(/Pikachu crying because/i);
    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
