import React from 'react';
import { render, screen } from '@testing-library/react';

import NotFound from '../components/NotFound';

describe('Testa o componente "<NotFound.js />"', () => {
  it(`Deveria conter um heading h2 com o texto "Page requested not found"
  na pagina`, () => {
    render(<NotFound />);

    const subtitle = screen.getByRole('heading', { level: 2 });
    expect(subtitle).toHaveTextContent('Page requested not found');
  });

  it('Deveria mostrar a imagem', () => {
    render(<NotFound />);

    const textAltImageNotFound = screen.getByAltText(
      'Pikachu crying because the page requested was not found',
    );

    expect(textAltImageNotFound.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
