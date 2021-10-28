import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testando o componente NotFound e seus comportamentos esperado', () => {
  it('Testando se existe um h2 com o nome "Page requested not found"', () => {
    renderWithRouter(<NotFound />);
    const header = screen.getByText('Page requested not found');
    const getRole = screen.getByLabelText('Crying emoji');

    expect(header).toBeInTheDocument();
    expect(header).toContainElement(getRole);
  });
  it('Testando se a foto tem o src especificado', () => {
    renderWithRouter(<NotFound />);
    const img = screen
      .getByAltText('Pikachu crying because the page requested was not found');

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', expect
      .stringContaining('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif'));
  });
});
