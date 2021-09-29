import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('<NotFound.js />', () => {
  test('página contém um heading h2 com o texto Page requested not found', () => {
    render(<NotFound />);

    const heading = screen.getByRole('heading', { level: 2 });

    expect(heading).toHaveTextContent('Page requested not found');
  });
  test('Teste se página mostra a imagem', () => {
    render(<NotFound />);

    const image = screen.getByAltText(
      'Pikachu crying because the page requested was not found',
    );

    expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
