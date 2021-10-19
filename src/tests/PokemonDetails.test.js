import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <PokemonDetails.js />', () => {
  const moreDetails = 'More details';
  test('Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela.',
    () => {
      renderWithRouter('/');

      const linkDetails = screen.getByRole('link', { name: moreDetails });
      userEvent.click(linkDetails);

      const h2 = screen.getByText('Pikachu Details');
      expect(h2).toBeInTheDocument();

      expect(linkDetails).not.toBeInTheDocument();

      const summary = screen.getByText('Summary');
      expect(summary).toBeInTheDocument();

      const textDetailsPokemons = 'This intelligent Pokémon roasts hard berries with '
      + 'electricity to make them tender enough to eat.';
      const detailsPokemons = screen.getByText(textDetailsPokemons);

      expect(detailsPokemons).toBeInTheDocument();
    });

  test(`Teste se existe na página uma seção com os mapas 
  contendo as localizações do pokémon`,
  () => {
    renderWithRouter('/');
    const linkDetails = screen.getByRole('link', { name: moreDetails });
    userEvent.click(linkDetails);

    const h2 = screen.getByRole('heading', {
      level: 2,
      name: 'Game Locations of Pikachu',
    });

    expect(h2).toBeInTheDocument();

    const location1 = screen.getByText('Kanto Viridian Forest');
    const location2 = screen.getByText('Kanto Power Plant');

    expect(location1).toBeInTheDocument();
    expect(location2).toBeInTheDocument();

    const locationImg = screen.getAllByRole('img');
    expect(locationImg[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(locationImg[1]).toHaveAttribute('alt', 'Pikachu location');

    expect(locationImg[2]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(locationImg[2]).toHaveAttribute('alt', 'Pikachu location');
  });

  test('Teste se o usuário pode favoritar um pokémon através da página de detalhes.',
    () => {
      renderWithRouter('/');
      const linkDetails = screen.getByRole('link', { name: moreDetails });
      userEvent.click(linkDetails);

      const checkbox = screen.getByRole('checkbox');

      expect(checkbox).toBeInTheDocument();

      userEvent.click(checkbox);

      const favoritesPokemons = JSON.parse(localStorage.getItem('favoritePokemonIds'));

      expect(favoritesPokemons.length).toBe(1);

      userEvent.click(checkbox);

      const currentFavoritesPokemons = JSON.parse(
        localStorage.getItem('favoritePokemonIds'),
      );

      expect(currentFavoritesPokemons.length).toBe(0);
      const label = screen.getByText('Pokémon favoritado?');

      expect(label).toContainHTML('Pokémon favoritado?');
    });
});
