import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './utils/renderWithRouter';
import { NotFound } from '../components';

describe('Testa o NotFound.js', () => {
  test('se página contém um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);

    const titleNotFound = screen.getByRole('heading', { level: 2 });
    expect(titleNotFound).toBeInTheDocument();

    const titleContent = screen.getByText(/Page requested not found/i);
    expect(titleContent).toBeInTheDocument();

    const titleImage = screen
      .getByAltText('Pikachu crying because the page requested was not found');
    expect(titleImage).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
