import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Testa o componente <NotFound.js />', () => {
  it(`Testa se página contém um heading h2
  com o texto Page requested not found 😭`, () => {
    render(<NotFound />);
    const title = screen.getByRole('heading', { level: 2 });
    expect(title).toHaveTextContent('Page requested not found 😭');
  });

  it(`Testa se página mostra a imagem
  https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif`, () => {
    render(<NotFound />);
    const image = screen.getAllByRole('img');
    expect(image[1]).toHaveAttribute(
      'src',
      'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
    );
  });
});
