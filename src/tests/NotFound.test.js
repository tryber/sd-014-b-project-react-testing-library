import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { NotFound } from '../components';

describe('Testes do componente NotFound', () => {
  it('A pagina deve contem um h2 com o texto "Page requested not found 😭"', () => {
    renderWithRouter(<NotFound />);
    const notFoundTitle = screen.getByRole('heading', {
      level: 2,
      name: 'Page requested not found Crying emoji',
    });
    expect(notFoundTitle).toBeInTheDocument();
  });
  it('um gif do pikachu chorando deve ser exibida na página', () => {
    renderWithRouter(<NotFound />);
    const cryingChu = screen
      .getByAltText('Pikachu crying because the page requested was not found');
    const url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(cryingChu).toHaveAttribute('src', url);
  });
});
