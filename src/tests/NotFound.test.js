import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

describe('Teste do componente NotFound', () => {
  it('Testa se existe o titulo Page requested not found 😭', () => {
    renderWithRouter(<NotFound />);

    const title = screen.getByText(/Page requested not found/i);
    expect(title).toBeInTheDocument();
  });

  it('Testa se existe uma imagem do Pikachu', () => {
    renderWithRouter(<NotFound />);

    const img = screen.getByAltText(/Pikachu crying because/i);
    expect(img).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
