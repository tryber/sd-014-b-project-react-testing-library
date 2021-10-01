import { render, screen } from '@testing-library/react';
import React from 'react';
import NotFound from '../components/NotFound';

describe('Teste o componente NotFound', () => {
  it('página contém um heading h2 com o texto Page requested not found ;', () => {
    render(<NotFound />);

    const notFoundText = screen.getByRole('heading', { level: 2 });
    expect(notFoundText).toHaveTextContent('Page requested not found');
  });
  it('página mostra a imagem do pikachu triste', () => {
    render(<NotFound />);

    const image = screen.getByAltText(
      'Pikachu crying because the page requested was not found',
    );
    expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
