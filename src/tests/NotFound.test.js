import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Teste o componente <NotFound.js />', () => {
  it(`Teste se página contém um heading
  h2 com o texto Page requested not found 😭`, () => {
    render(<NotFound />);
    const notFound = screen.getByText(/Page requested not found/i);
    expect(notFound).toBeInTheDocument();
  });
  it(`Teste se página mostra a imagem
  https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif`, () => {
    render(<NotFound />);
    const pageImages = screen.getAllByRole('img');
    expect(pageImages[1]).toHaveAttribute(
      'src',
      'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
    );
  });
});
