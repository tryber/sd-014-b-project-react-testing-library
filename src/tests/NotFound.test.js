import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './RenderWithRouter';
import NotFound from '../components/NotFound';

describe('2 - Teste o componente <About.js />', () => {
  test('Teste se página contém um h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);
    const title = screen.getByRole('heading',
      { level: 2, name: 'Page requested not found Crying emoji' });
    expect(title).toBeInTheDocument();
  });

  test('Teste se página mostra a imagem Pikachu crying', () => {
    renderWithRouter(<NotFound />);
    const srcImage = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const cryingPikach = screen.getByRole('img', { name: /Pikachu crying/i });
    expect(cryingPikach).toHaveAttribute('src', srcImage);
  });
});
