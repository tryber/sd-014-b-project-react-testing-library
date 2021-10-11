import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../RenderWithRouter';
import { NotFound } from '../components';

describe('Teste o componente <NotFound.js />', () => {
  test('se página contém um heading h2 com o texto Page requested not found 😭', () => {
    renderWithRouter(<NotFound />);
    const notFoundTitle = screen.getByRole('heading',
      { name: 'Page requested not found Crying emoji', level: 2 });
    expect(notFoundTitle).toBeInTheDocument();
  });
  test('Teste se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    renderWithRouter(<NotFound />);
    const imageLink = 'Pikachu crying because the page requested was not found';
    const displayedImage = screen.getByAltText(imageLink);
    const srcImage = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(displayedImage.src).toContain(srcImage);
  });
});
