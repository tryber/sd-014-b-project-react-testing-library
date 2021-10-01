import React from 'react';
import { screen, render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { About } from '../components';

describe('Testa o componente About', () => {
  test('Teste se a página contém as informações sobre a Pokédex.', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <About />
      </Router>,
    );
    const text = screen.queryByText(
      /This application simulates a Pokédex/,
    );

    expect(text).toBeInTheDocument();
  });

  test('Teste se a página contém o texto About Pokédex.', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <About />
      </Router>,
    );
    const text = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });

    expect(text).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos.', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <About />
      </Router>,
    );
    const text = screen.queryByText(
      /This application simulates a Pokédex/,
      /One can filter Pokémons by type/,
    );
    expect(text).toBeInTheDocument();
  });

  test('Teste se a página contém uma imagem específica.', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <About />
      </Router>,
    );
    const text = screen.queryByRole('img', {
      src: 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    });

    expect(text).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
