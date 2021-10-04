import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('requisito 4', () => {
  test('se tem uma pagina h2 com texto', () => {
    render(<NotFound />);
    const text = screen.getByText('Page requested not found');
    expect(text).toBeInTheDocument();
  });

  test('se o emoticon é renderizado', () => {
    render(<NotFound />);
    const src = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    const srcText = screen.getByRole('img', {
      name: 'Pikachu crying because the page requested was not found' });
    expect(srcText.src).toBe(src);
  });
});
