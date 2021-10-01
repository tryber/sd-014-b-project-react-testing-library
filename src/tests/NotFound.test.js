import React from 'react';
import { screen } from '@testing-library/react';
import { NotFound } from '../components';
import renderWithRouter from '../components/renderWithRouter';

describe('testanto se o NotFound esta funcionando corretamente', () => {
  it('Testa se página contém um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);
    const heading = screen.getByRole('heading', {
      name: /Page requested not found/,
      level: 2,
    });

    expect(heading).toBeInTheDocument();
  });

  it('Testa se a página contém uma imagem', () => {
    renderWithRouter(<NotFound />);
    const altImage = screen.getByAltText(/Pikachu crying because/);

    expect(altImage.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
