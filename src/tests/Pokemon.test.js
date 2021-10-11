import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
// import pokemons from '../data';

describe('Teste o componente <Pokemon.js />', () => {
  const MORE_DETAILS = 'More details';
  const URL = '/pokemons/25';
  it('Teste se é renderizado um card com as informações de determinado pokémon.', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName.textContent).toBe('Pikachu');
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType.textContent).toBe('Electric');
    const pokemonWeigth = screen.getByTestId('pokemon-weight');
    expect(pokemonWeigth.textContent).toBe('Average weight: 6.0 kg');
    const pokemonImg = screen.getByRole('img');
    expect(pokemonImg).toBeInTheDocument();
    expect(pokemonImg.alt).toBe('Pikachu sprite');
    expect(pokemonImg).toHaveAttribute('src',
      'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it(`Teste se o card do Pokémon indicado na Pokédex contém um link de navegação
  para exibir detalhes deste Pokémon. O link deve possuir a URL /pokemons/<id>,
  onde <id> é o id do Pokémon exibido`, () => {
    renderWithRouter(<App />);
    const link = screen.getByRole('link', {
      name: MORE_DETAILS,
    });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', URL);
  });

  it(`Teste também se a URL exibida no navegador muda para /pokemon/<id>,
  onde <id> é o id do Pokémon cujos detalhes se deseja ver`,
  () => {
    const { history } = renderWithRouter(<App />);
    const link = screen.getByRole('link', {
      name: MORE_DETAILS,
    });
    expect(link).toBeInTheDocument();
    userEvent.click(link);
    expect(history.location.pathname).toBe(URL);
  });

  it(`Teste se ao clicar no link de navegação do Pokémon,
  é feito o redirecionamento da aplicação para a página de detalhes de Pokémon`,
  () => {
    const { history } = renderWithRouter(<App />);
    const link = screen.getByRole('link', {
      name: MORE_DETAILS,
    });
    expect(link).toBeInTheDocument();
    userEvent.click(link);
    expect(history.location.pathname).toBe(URL);
    const pikachuDetails = screen.getByRole('heading', {
      level: 2,
      name: 'Pikachu Details',
    });
    expect(pikachuDetails).toBeInTheDocument();
  });

  it('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<App />);
    const link = screen.getByRole('link', {
      name: MORE_DETAILS,
    });
    expect(link).toBeInTheDocument();
    userEvent.click(link);
    const checkBox = screen.getByLabelText('Pokémon favoritado?');
    expect(checkBox).toBeInTheDocument();
    userEvent.click(checkBox);
    const starImg = screen.getByAltText('Pikachu is marked as favorite');
    expect(starImg).toHaveAttribute('src', '/star-icon.svg');
    const homeLink = screen.getByRole('link', { name: 'Home' });
    userEvent.click(homeLink);
    const starPokemonPrincipal = screen.getByAltText('Pikachu is marked as favorite');
    expect(starPokemonPrincipal).toBeInTheDocument();
  });
});
