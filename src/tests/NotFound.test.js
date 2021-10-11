import React from 'react';
import { screen, render } from '@testing-library/react';
import { NotFound } from '../components';

describe('Teste o componente <NotFound.js />', () => {
  it('contém um heading h2 com o texto "Page requested not found 😭"', () => {
    render(<NotFound />);
    const imageParagraph = screen.getByRole('heading', { level: 2 });
    expect(imageParagraph.textContent).toBe('Page requested not found 😭');
  });

  it('Teste se página mostra a imagem', () => {
    render(<NotFound />);
    const imageNotFound = screen
      .getByAltText('Pikachu crying because the page requested was not found');
    expect(imageNotFound.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
