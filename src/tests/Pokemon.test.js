import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <Pokemon.js />', () => {
  const moreDetails = 'More details';
  test(`Teste se é renderizado um card com as 
  informações de determinado pokémon.`, () => {
    renderWithRouter('/');
    const namePokemon = screen.getByTestId('pokemon-name');
    expect(namePokemon).toContainHTML('Pikachu');

    const typePokemon = screen.getByTestId('pokemon-type');
    expect(typePokemon).toContainHTML('Electric');

    const averageWeight = screen.getByTestId('pokemon-weight');
    expect(averageWeight).toContainHTML('Average weight: 6.0 kg');

    const imgPokemon = screen.getByRole('img');
    expect(imgPokemon).toBeInTheDocument();
    expect(imgPokemon).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(imgPokemon).toHaveAttribute('alt', 'Pikachu sprite');
  });

  test(`Testa se no card do pokemon tem um link para exibir 
  detalhes deste Pokémon`,
  () => {
    renderWithRouter('/');
    const linkDetails = screen.getByRole('link', { name: moreDetails });
    expect(linkDetails).toBeInTheDocument();
    expect(linkDetails).toHaveAttribute('href', '/pokemons/25');
  });

  test(`Teste se ao clicar no link de navegação do Pokémon,
  é feito o redirecionamento da aplicação para a página 
  de detalhes de Pokémon.`,
  () => {
    renderWithRouter('/');
    const linkDetails = screen.getByRole('link', { name: moreDetails });
    userEvent.click(linkDetails);

    expect(window.location.pathname).toBe('/pokemons/25');
  });

  test('Teste se existe um ícone de estrela nos Pokémons favoritados.',
    () => {
      renderWithRouter('/');
      const linkDetails = screen.getByRole('link', { name: moreDetails });
      userEvent.click(linkDetails);

      const checkbox = screen.getByRole('checkbox', { id: 'Favorite' });
      expect(checkbox).toBeInTheDocument();

      userEvent.click(checkbox);

      const img = screen.getAllByRole('img');

      expect(img[1]).toHaveAttribute('src', '/star-icon.svg');
      expect(img[1]).toHaveAttribute('alt', 'Pikachu is marked as favorite');
    });
});
