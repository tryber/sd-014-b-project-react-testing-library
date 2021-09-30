import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

describe('Testa as funcionalidades da pagina NotFound', () => {
  it('testa se a página possui um h2', () => {
    renderWithRouter(<NotFound />);
    const heading = screen.getByRole('heading', {
      name: 'Page requested not found Crying emoji' });
    expect(heading).toBeInTheDocument();
  });

  it('testa se a pagina possui uma Imagem', () => {
    renderWithRouter(<NotFound />);
    const img = screen.getByAltText(/Pikachu crying because/i);
    expect(img).toHaveProperty('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
