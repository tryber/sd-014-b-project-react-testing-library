import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';
import data from '../data';

const renderWithRouter = (comp) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{ comp }</Router>), history,
  });
};

describe('Teste o componente <Pokedex.js />', () => {
  test('página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);

    const heading = screen.getByRole('heading', { level: 2 });

    expect(heading).toHaveTextContent('Encountered pokémons');
  });
  test('É exibido o próximo Pokémon da lista quando o botão Próximo pokémon é clicado.',
    () => {
      renderWithRouter(<App />);

      const next = screen.getByRole('button', { name: 'Próximo pokémon' });

      expect(next).toBeInTheDocument();
      fireEvent.click(next);

      expect(screen.getByText('Charmander')).toBeInTheDocument();
    });
  test('É mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);

    expect(screen.getAllByText('More details').length).toBe(1);
  });
  test('A Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<App />);

    expect(screen.getAllByTestId('pokemon-type-button').length).toBeGreaterThanOrEqual(1);

    data.forEach(({ type }) => {
      const button = screen.getByRole('button', { name: `${type}` });
      expect(button).toBeInTheDocument();
    });

    expect(screen.getByRole('button', { name: 'All' }));
  });
  test('Ao clicar em um botão, mostra somente pokemons daquele tipo', () => {
    renderWithRouter(<App />);
    const btn = screen.getByRole('button', { name: 'Psychic' });
    fireEvent.click(btn);

    for (let i = 0; i < data.length; i += 1) {
      expect(screen.getByTestId('pokemon-type')).toHaveTextContent('Psychic');
      fireEvent.click(screen.getByTestId('next-pokemon'));
    }
  });
  test('Ao clicar em All, reseta a lista de pokemons', () => {
    renderWithRouter(<App />);

    fireEvent.click(screen.getByRole('button', { name: 'All' }));
    let pokes = 0;
    do {
      pokes += 1;
      fireEvent.click(screen.getByTestId('next-pokemon'));
    } while (screen.getByTestId('pokemon-name').textContent !== 'Pikachu');

    expect(data.length).toBe(pokes);
  });
});
