import React from 'react';
import { render, screen } from '@testing-library/react';
import { NotFound } from '../components';

describe('Testa se o componente NotFound:', () => {
  test('deve conter um heading com o texto "Page request not found 😭"', () => {
    render(<NotFound />);
    const expectedText = 'Page requested not found Crying emoji';
    const heading = screen.getByRole('heading', { name: expectedText });
    expect(heading).toBeInTheDocument();
  });

  test('deve conter uma imagem com código "kNSeTs31XBZ3G"', () => {
    render(<NotFound />);
    const expectedAltText = 'Pikachu crying because the page requested was not found';
    const image = screen.getByRole('img', { name: expectedAltText });
    expect(image.src).toContain('kNSeTs31XBZ3G');
  });
});
