import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Testes requisito 4, teste do component NotFound', () => {
  test('Testa se contem um heading h2 com texxto Page Request not found', () => {
    render(<NotFound />);

    const notFound404 = screen.getByRole('heading', { level: 2 });
    expect(notFound404).toHaveTextContent('Page requested not found');
  });

  test('Testa se carrega a exata imagem do pikachi chorrando', () => {
    render(<NotFound />);

    const image = screen.getByAltText(
      'Pikachu crying because the page requested was not found',
    );
    expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
