import React from 'react';
import { screen, render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Teste o componente <NotFound.js />', () => {
  test('Se página contém um heading h2 com o texto `Page requested not found 😭`', () => {
    render(<NotFound />);

    const pageRequestedNotFound = screen.getByText('Page requested not found');
    const cryingEmoji = screen.getByText('😭');

    expect(pageRequestedNotFound).toBeInTheDocument();
    expect(cryingEmoji).toBeInTheDocument();
  });

  test('Se a página contém uma imagem', () => {
    render(<NotFound />);

    const imagem = screen
      .getByAltText('Pikachu crying because the page requested was not found');
    expect(imagem).toBeInTheDocument();
    expect(imagem).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
