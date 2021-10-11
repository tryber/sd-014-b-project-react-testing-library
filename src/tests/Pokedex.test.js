import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import data from '../data';

describe('Testa o componente About.js', () => {
  const proxPoke = 'Próximo pokémon';
  test('Testa se a página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const titlePokedex = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons' });

    expect(titlePokedex).toBeInTheDocument();
  });

  test('Testa se é exibido o próximo Pokémon da lista quando o botão é clicado', () => {
    renderWithRouter(<App />);
    const prox = screen.getByRole('button', { name: proxPoke });
    fireEvent.click(screen.getByRole('button', { name: 'All' }));
    const pikachu = screen.getByText('Pikachu');

    expect(pikachu).toBeInTheDocument();

    fireEvent.click(prox);
    const charmander = screen.getByText('Charmander');

    expect(charmander).toBeInTheDocument();

    fireEvent.click(prox);
    const caterpie = screen.getByText('Caterpie');

    expect(caterpie).toBeInTheDocument();
  });

  test('Testa se é exibido o próximo Pokémon da lista quando o botão é clicado', () => {
    renderWithRouter(<App />);
    const prox = screen.getByRole('button', { name: proxPoke });
    fireEvent.click(screen.getByRole('button', { name: 'Fire' }));
    const charmander = screen.getByText('Charmander');

    expect(charmander).toBeInTheDocument();

    fireEvent.click(prox);
    const rapidash = screen.getByText('Rapidash');

    expect(rapidash).toBeInTheDocument();

    fireEvent.click(prox);

    expect(charmander).toBeInTheDocument();
  });

  test('Testa se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);
    const details = screen.getAllByText('More details');

    expect(details.length).toBe(1);
  });

  test('Testa se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<App />);

    expect(screen.getAllByTestId('pokemon-type-button').length).toBeGreaterThanOrEqual(1);

    expect(screen.getByRole('button', { name: 'All' }));

    data.forEach(({ type }) => {
      const btnType = screen.getByRole('button', { name: `${type}` });

      expect(btnType).toBeInTheDocument();
    });
  });

  test('Testa se a Pokédex circula somente pelos pokémons do mesmo tipo', () => {
    renderWithRouter(<App />);
    const prox = screen.getByRole('button', { name: proxPoke });
    const buttonFire = screen.getByRole('button', { name: 'Fire' });
    const type = screen.getByText('Fire');

    fireEvent.click(buttonFire);
    expect(type).toBeInTheDocument();

    fireEvent.click(prox);
    expect(type).toBeInTheDocument();

    fireEvent.click(prox);
    expect(type).toBeInTheDocument();

    expect(screen.getByRole('button', { name: 'All' }));
  });

  test('Testa se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    fireEvent.click(screen.getByRole('button', { name: 'All' }));
    let pokemons = 0;
    do {
      fireEvent.click(screen.getByRole('button', { name: proxPoke }));
      pokemons += 1;
    } while (screen.getByTestId('pokemon-name').textContent !== 'Pikachu');

    expect(data.length).toBe(pokemons);
  });
});
