import { screen, render } from '@testing-library/react';
import React from 'react';
import NotFound from '../components/NotFound';

describe('Testa a aplicação do component About', () => {
  test('se página contém  o texto Page requested not found', () => {
    render(<NotFound />);

    const headingText = screen.getByRole('heading',
      { level: 2, name: /Page requested not found/ });
    expect(headingText).toBeInTheDocument();
  });

  test('se página mostra o gif', () => {
    render(<NotFound />);

    const image = screen.getAllByRole('img')[1];
    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    expect(image)
      .toHaveAttribute('alt', 'Pikachu crying because the page requested was not found');
  });
});
