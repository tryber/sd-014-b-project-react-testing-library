import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './RenderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';
import { Pokemon } from '../components';

describe('Requisito 6 - Testa o componente <Pokemon.js />', () => {
  it('Testa se é renderizado um card com as info do pokémon', () => {
    // Pega os dados do Pikachu, que já é o primeiro:
    const { name, type, image, averageWeight: { value, measurementUnit } } = pokemons[0];
    // Renderiza a tela no Pikachu
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } />);
    // Testa se mostra o nome no textContent
    const { textContent } = screen.getByTestId('pokemon-name');
    expect(textContent).toBe(name);
    // Testa se mostra o tipo...Mas não dá pra desestruturar
    // textContent de novo :( haha
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType.textContent).toBe(type);
    // Testa o peso agora:
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonWeight.textContent).toBe(`Average weight: ${value} ${measurementUnit}`);
    // Imagem do poke:
    const pokemonImage = screen.getByRole('img', {
      name: `${name} sprite`,
    });
    expect(pokemonImage).toHaveAttribute('src', image);
  });

  it('Testa o botão More Details', () => {
    const { history } = renderWithRouter(<App />);
    const detailsButton = screen.getByRole(
      'link', {
        name: 'More details',
      },
    );
    expect(detailsButton).toBeInTheDocument();
    fireEvent.click(detailsButton);
    const { pathname } = history.location;
    // Testo se clicar em More details leva pra página
    // de detalhes do Pikachu, que é o primeiro a aparecer
    // (link obtido no npm start)
    expect(pathname).toBe('/pokemons/25');
  });

  test('se existe um ícone de estrela nos Pokémons favoritados', () => {
    // Renderiza uma tela de favoritos com todos favoritados
    renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);
    // pega o name de cada obj pokemon
    const everyPokemonName = pokemons.map((({ name }) => name));
    // Testa cada card de pokemon, com base no nome obtido
    everyPokemonName.forEach((pokemonName) => {
      const pokemonCard = screen.getByRole('img', {
        name: `${pokemonName} is marked as favorite`,
      });
      expect(pokemonCard).toHaveAttribute('src', '/star-icon.svg');
    });
  });
});
