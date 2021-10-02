import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('verifica se contém um heading e uma imagem', () => {
  it('deveria exibir um heading "h2" com texto "Page requested not found"', () => {
    render(<NotFound />);
    const textTitle = screen.getByText(/Page requested not found/i);
    expect(textTitle).toBeInTheDocument();
  });
});
