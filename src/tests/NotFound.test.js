import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { NotFound } from '../components';

describe('Testa o componente <NotFound.js />', () => {
  test('Se a página contém um título e uma imagem', () => {
    renderWithRouter(<NotFound />);

    const header = screen.getByText(/Page requested not found/i);
    expect(header).toBeInTheDocument();

    const animatedImage = screen.getByAltText(/Pikachu crying/i);
    expect(animatedImage).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
