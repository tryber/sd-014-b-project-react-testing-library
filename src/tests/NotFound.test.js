import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testa o componente <NotFound.js />', () => {
  test(`Teste se página contém um heading
  h2 com o texto Page requested not found 😭`, () => {
    renderWithRouter(<NotFound />);
    const title = screen.getByText('Page requested not found');
    expect(title).toBeInTheDocument();

    const image = screen
      .getByAltText('Pikachu crying because the page requested was not found');
    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
