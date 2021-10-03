import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Testa se o componente NotFound.js', () => {
  test('se a página contém um heading h2 com o texto Page requested not found 😭',
    () => {
      render(<NotFound />);

      const notFound = screen.getByText(/Page requested not found/i);

      expect(notFound).toBeInTheDocument();
    });

  test('se a página monstra a imagem  https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
    () => {
      render(<NotFound />);

      const allImg = screen.getAllByRole('img');

      expect(allImg[1]).toHaveAttribute(
        'src',
        'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
      );
    });
});
