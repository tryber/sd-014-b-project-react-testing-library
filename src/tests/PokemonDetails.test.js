import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testa o componente PokemonDetails', () => {
  test('verifica se as informações são mostradas na tela', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const linkDetails = screen.getByRole('link', {
      name: /details/,
    });
    userEvent.click(linkDetails);

    expect(screen.getByText('Pikachu Details')).toBeInTheDocument();
    expect(linkDetails).not.toBeInTheDocument();
    expect(screen.getByRole('heading', {
      level: 2,
      name: /Summary/,
    }));
    expect(screen.getByText(
      /Pokémon roasts hard berries with electricity to make them tender enough to eat./,
    ));
  });

  test('verifica se existem mapas na tela', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const nextPokemon = screen.getByRole('button', {
      name: /Próximo pokémon/,
    });
    userEvent.click(nextPokemon);
    userEvent.click(nextPokemon);
    userEvent.click(nextPokemon);
    const linkDetails = screen.getByRole('link', {
      name: /details/,
    });
    userEvent.click(linkDetails);

    expect(screen.getByRole('heading', {
      level: 2,
      name: /Game Locations of Ekans/,
    }));

    const mapGame = screen.getByText('Goldenrod Game Corner');
    const mapLocation = screen.getByAltText('Ekans location');
    expect(mapGame).toBeInTheDocument();
    expect(mapLocation).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/e/ec/Johto_Goldenrod_City_Map.png');
    expect(mapLocation).toBeInTheDocument();
  });

  test('verifica se as informações são mostradas na tela', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const linkDetails = screen.getByRole('link', {
      name: /details/,
    });
    userEvent.click(linkDetails);

    const checkboxButton = screen.getByRole('checkbox', {
      name: /Pokémon favoritado?/,
    });
    expect(checkboxButton).toBeInTheDocument();
    userEvent.click(checkboxButton);
    const favoritePokeLink = screen.getByText('Favorite Pokémons');
    userEvent.click(favoritePokeLink);

    expect(screen.getByText('Pikachu')).toBeInTheDocument();
  });
});
