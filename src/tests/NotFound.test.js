import React from 'react';
import { screen, render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Testando o componente <NotFound.js />', () => {
  it('Teste se página contém um h2 com o "texto Page requested not found"', () => {
    render(<NotFound />);
    const notFoundPage = screen.getByText('Page requested not found');
    expect(notFoundPage).toBeDefined();
  });
  it('Verificar Crying Emoji', () => {
    render(<NotFound />);
    const emoji = screen
      .getByAltText('Pikachu crying because the page requested was not found');
    expect(emoji).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
