import React from 'react';
import { Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import NotFound from '../components/NotFound';

describe('Testando a pagina NotFound', () => {
  test('Testa se aparece uma frase Page requested not found', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <NotFound />
      </Router>,
    );
    const text = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/,
    });

    expect(text).toBeInTheDocument();
  });

  test('Testa se aparece uma determinada imagem', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <NotFound />
      </Router>,
    );
    const PikachuGif = screen.getByAltText(/Pikachu crying because/);

    expect(PikachuGif).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
