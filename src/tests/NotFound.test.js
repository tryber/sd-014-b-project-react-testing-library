import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './RenderWithRouter';
import { NotFound } from '../components';

describe('Testa se o componente NotFound funciona corretamente', () => {
  test('se a página contém um h2 com o texto "Page requested not found"', () => {
    renderWithRouter(<NotFound />);
    const notFound = screen.getByText('Page requested not found');
    expect(notFound).toBeInTheDocument();
  });

  test('se a página mostra a gif especificada', () => {
    renderWithRouter(<NotFound />);
    const image = screen.getByAltText(/Pikachu crying/).src;
    expect(image).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
