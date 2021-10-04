import React from 'react';
import { render, screen } from '@testing-library/react';
import { NotFound } from '../components';

describe('NotFound.js testcase', () => {
  test('e página contém um heading h2 com o texto Page requested not found 😭', () => {
    render(<NotFound />);

    const notFound = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found Crying emoji/i,
    });
    expect(notFound).toBeInTheDocument();
  });

  test('se página mostra a imagem correta.', () => {
    render(<NotFound />);

    const img = screen.getAllByRole('img');
    expect(img[1]).toHaveAttribute(
      'src',
      'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif'
    );
  });
});
