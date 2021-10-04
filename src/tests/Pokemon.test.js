import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

describe('Testa o componente Pokemon', () => {
  const nextBtnText = 'Próximo pokémon';
  const moreDetailsText = 'More details';
  const testIdPokemonName = 'pokemon-name';
  test('o nome correto do Pokémon deve ser mostrado na tela', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByTestId(testIdPokemonName);
    expect(pokemonName).toHaveTextContent(pokemons[0].name);
    const nextBtn = screen.getByText(nextBtnText);
    fireEvent.click(nextBtn);
    expect(pokemonName).toHaveTextContent(pokemons[1].name);
  });

  test('o tipo correto do Pokémon deve ser mostrado na tela', () => {
    renderWithRouter(<App />);

    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent(pokemons[0].type);
    const nextBtn = screen.getByText(nextBtnText);
    fireEvent.click(nextBtn);
    expect(pokemonType).toHaveTextContent(pokemons[1].type);
  });

  test('o peso correto do Pokémon deve ser mostrado na tela no formato certo', () => {
    renderWithRouter(<App />);

    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const { value, measurementUnit } = pokemons[0].averageWeight;
    const weightFormat = `Average weight: ${value} ${measurementUnit}`;
    expect(pokemonWeight).toHaveTextContent(weightFormat);
  });

  test('a imagem do pokemon deve ser exibida com o src e alt corretos', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getByTestId(testIdPokemonName);
    const pokemonImg = screen.getByAltText(`${pokemonName.textContent} sprite`);
    expect(pokemonImg).toBeInTheDocument();
    const imgUrl = pokemons.find(({ name }) => name === pokemonName.textContent).image;
    expect(pokemonImg).toHaveAttribute('src', imgUrl);
  });

  test('o botão more details deve ter um link pra pagina do pokemon', () => {
    renderWithRouter(<App />);
    const moreDetailsBtn = screen.getByText(moreDetailsText);
    const pokemonName = screen.getByTestId(testIdPokemonName);
    const pokemonId = pokemons.find(({ name }) => name === pokemonName.textContent).id;
    expect(moreDetailsBtn).toHaveAttribute('href', `/pokemons/${pokemonId}`);
  });

  test('o botão more details deve redirecionar pra pagina do pokemon', () => {
    const { history } = renderWithRouter(<App />);
    const moreDetailsBtn = screen.getByText(moreDetailsText);
    const pokemonName = screen.getByTestId(testIdPokemonName);
    const pokemonId = pokemons.find(({ name }) => name === pokemonName.textContent).id;

    fireEvent.click(moreDetailsBtn);
    expect(history.location.pathname).toBe(`/pokemons/${pokemonId}`);
  });

  test('deve existir um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<App />);

    const moreDetailsBtn = screen.getByText(moreDetailsText);
    fireEvent.click(moreDetailsBtn);

    const favoriteBtn = screen.getByLabelText('Pokémon favoritado?');
    fireEvent.click(favoriteBtn);

    const homeBtn = screen.getByRole('link', { name: 'Home' });
    fireEvent.click(homeBtn);

    const pokemonName = screen.getByTestId(testIdPokemonName);
    const favIcon = screen
      .queryByAltText(`${pokemonName.textContent} is marked as favorite`);
    expect(favIcon).toBeInTheDocument();
    expect(favIcon).toHaveAttribute('src', '/star-icon.svg');
  });
});
