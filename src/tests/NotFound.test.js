import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { NotFound } from '../components';

describe('NotFound.js tests set', () => {
  it('should the page Not Found having the suggested describe', () => {
    // Teste se página contém um heading h2 com o texto Page requested not found.
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );

    const textNotFound = screen.getByRole('heading', {
      level: 2, name: /page requested not found/i });
    expect(textNotFound).toBeInTheDocument();
  });

  it('should the page Not Found shows the solicited image', () => {
    // Teste se página mostra a imagem solicitada.
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );

    const imgNotFound = screen.getByRole('img', { name: /pikachu crying/i });
    expect(imgNotFound).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
