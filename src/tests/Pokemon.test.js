import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import App from '../App';

describe('Pokemon.js tests set', () => {
  it('should to renderize a card with one pokemons info determined', () => {
    // Teste se é renderizado um card com as informações de determinado pokémon.
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const namePokemon = screen.getByTestId('pokemon-name');
    const typePokemon = screen.getByTestId('pokemon-type');
    const weightPokemon = screen.getByTestId('pokemon-weight');
    const imgPokemon = screen.getByRole('img', { name: /sprite/i });

    expect(namePokemon.innerHTML).toBe('Pikachu');
    expect(typePokemon.innerHTML).toBe('Electric');
    expect(weightPokemon.innerHTML).toBe('Average weight: 6.0 kg');
    expect(imgPokemon).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('should the card contains a link with pokemon details', () => {
    // Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon. O link deve possuir a URL /pokemons/<id>, onde <id> é o id do Pokémon exibido;
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const detailsLink = screen.getByRole('link', { name: /more details/i });
    expect(detailsLink).toHaveAttribute('href', '/pokemons/25');
  });

  it('should the click in the nav link redirectly to a detail page', () => {
    // Teste se ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon.
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const detailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailsLink);
    const pokemonDetails = screen.getByRole('heading', {
      level: 2, name: /Pikachu Details/i });
    expect(pokemonDetails).toBeInTheDocument();
  });

  it('should the URL changes to be /pokemon/<id>', () => {
    // Teste também se a URL exibida no navegador muda para /pokemon/<id>, onde <id> é o id do Pokémon cujos detalhes se deseja ver;
    const customHistory = createMemoryHistory();

    render(
      <Router history={ customHistory }>
        <App />
      </Router>,
    );

    const detailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailsLink);
    expect(customHistory.location.pathname).toBe('/pokemons/25');
  });

  it('should exists a star icone in the favorited pokemons', () => {
    // Teste se existe um ícone de estrela nos Pokémons favoritados.
    const customHistory = createMemoryHistory();

    render(
      <Router history={ customHistory }>
        <App />
      </Router>,
    );

    customHistory.push('/pokemons/23');
    const checkboxPokemon = screen.getByRole('checkbox', { checked: false });
    userEvent.click(checkboxPokemon);
    const starImg = screen.getByRole('img', { name: 'Ekans is marked as favorite' });
    expect(starImg).toHaveAttribute('src', '/star-icon.svg');
  });
});
