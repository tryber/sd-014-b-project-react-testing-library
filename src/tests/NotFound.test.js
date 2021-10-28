import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { NotFound } from '../components';

describe('teste da página não encontrada', () => {
  it('contém um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);
    const text = screen.getByRole('heading', {
      name: /Page requested not found/i,
      level: 2 });
    expect(text).toBeInTheDocument();
  });
  it('contém uma imagem', () => {
    renderWithRouter(<NotFound />);
    const imgSrc = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const img = screen.getByRole('img', { name: /Pikachu crying because/i });
    expect(img).toHaveAttribute('src', imgSrc);
    expect(img).toBeInTheDocument();
  });
});
