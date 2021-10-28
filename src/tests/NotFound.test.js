import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Teste do componente <NotFound.js />', () => {
  test('Verifica heading e imagem', () => {
    render(<NotFound />);
    const heading = screen.getByText('Page requested not found');
    expect(heading).toBeInTheDocument();

    const image = screen
      .getByAltText('Pikachu crying because the page requested was not found');
    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
