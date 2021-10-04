import { render, screen } from '@testing-library/react';
import React from 'react';
import NotFound from '../components/NotFound';

describe('Teste o componente <NotFound.js />', () => {
  it('este se página contém um heading h2 com o texto Page requested not found 😭', () => {
    render(<NotFound />);

    const h2 = screen.getByRole('heading', { name: /Page requested not found/ });
    expect(h2).toBeInTheDocument();
  });
  it('Teste se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    render(<NotFound />);

    const img = screen.getByAltText(/Pikachu crying because the page requested/);
    expect(img).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
