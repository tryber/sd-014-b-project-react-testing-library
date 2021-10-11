import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Se são renderizadas as informações no componente NotFound', () => {
  test('Se contém um heading h2 com o texto Page requested not found', () => {
    render(<NotFound />);

    const notFoundText = screen.getByRole('heading', {
      level: 2,
      name: 'Page requested not found Crying emoji',
    });
    expect(notFoundText).toBeInTheDocument();
  });

  test('Se a página contém a seguinte imagem um Pikachu chorando', () => {
    render(<NotFound />);

    const notFoundImg = screen.getByAltText(/crying/i);
    expect(notFoundImg).toHaveAttribute('src',
      'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
