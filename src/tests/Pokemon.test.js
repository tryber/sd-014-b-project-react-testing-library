import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const link = 'More details';

describe('Testando se é o card é renderizado corretamente', () => {
  it('Testa se contem o nome do pokemon', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonName.textContent).toBe('Pikachu');
  });

  it('Testa se tem o tipo do pokemon', () => {
    renderWithRouter(<App />);

    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonType.textContent).toBe('Electric');
  });

  it('Testa se tem o peso médio do pokemon', () => {
    renderWithRouter(<App />);

    const pokemonWeigth = screen.getByTestId('pokemon-weight');
    expect(pokemonWeigth).toBeInTheDocument();
    expect(pokemonWeigth.textContent).toBe('Average weight: 6.0 kg');
  });

  it('Testa se tem oa foto do pokemon', () => {
    renderWithRouter(<App />);

    const pokemonFoto = screen.getByAltText('Pikachu sprite');
    expect(pokemonFoto).toBeInTheDocument();
    expect(pokemonFoto).toHaveAttribute('src', expect
      .stringContaining('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png'));
  });
});

describe('Testando a existencia "Saiba Mais" do pokemon card', () => {
  it('Testando se o "Saiba Mais existe e tem o href correto', () => {
    renderWithRouter(<App />);

    const saibaMais = screen.getByRole('link',
      { name: link });
    expect(saibaMais).toBeInTheDocument();
    expect(saibaMais).toHaveAttribute('href', expect.stringContaining('/pokemons/25'));
  });
});

describe('Testa se ao clikar no link leva a página esperad', () => {
  it('Testando se o "Saiba Mais existe e tem o href correto', () => {
    const { history } = renderWithRouter(<App />);
    const saibaMais = screen.getByRole('link',
      { name: link });

    userEvent.click(saibaMais);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });
});

describe('Testando a estrela do pokemon favoritado', () => {
  it('Testa se a estrela tem o src com o caminho correto', () => {
    const { history } = renderWithRouter(<App />);
    const saibaMais = screen.getByRole('link',
      { name: link });

    userEvent.click(saibaMais);
    const buttonFav = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(buttonFav);
    history.push('/');

    const starFav = screen.getByAltText('Pikachu is marked as favorite');
    expect(starFav).toBeInTheDocument();
    expect(starFav).toHaveAttribute('src', expect.stringContaining('/star-icon.svg'));
  });
});
