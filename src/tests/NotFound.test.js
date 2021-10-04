// npx stryker run ./stryker/NotFound.conf.json
import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('teste do componente NotFound', () => {
  it('Deve conter h2 com texto: Page requested not found 😭', () => {
    render(<NotFound />);
    const h2 = screen.getByRole('heading', { level: 2 });
    expect(h2.textContent).toBe('Page requested not found 😭');
  });

  it('Deve exibir imagem do pokemom chorando', () => {
    render(<NotFound />);
    const img = screen.getByAltText(/Pikachu crying/);
    const src = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(img).toHaveAttribute('src', src);
  });
});
