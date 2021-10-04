import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../../helper/renderWithRouter';
import App from '../App';

const moreDetails = 'More details';

describe('Testa o componente Pokedex.js', () => {
  test('Testa se é renderizado um card com as informações de um pokémon.', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByText('Pikachu');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByText('Average weight: 6.0 kg');
    const pokemonImage = screen.getByAltText('Pikachu sprite');

    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType).toHaveTextContent('Electric');
    expect(pokemonWeight).toBeInTheDocument();
    expect(pokemonImage.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test(`Testa se o card do Pokémon indicado na Pokédex contém
   um link de navegação para exibir detalhes deste Pokémon`, () => {
    renderWithRouter(<App />);

    const link = screen.getByText(moreDetails);
    expect(link).toBeInTheDocument();
  });

  test(`Testa se ao clicar no link de navegação do Pokémon, é feito o
   redirecionamento da aplicação para a página de detalhes de Pokémon.`, () => {
    renderWithRouter(<App />);

    const link = screen.getByText(moreDetails);
    fireEvent.click(link);
    const pikachuDetails = screen.getByText('Pikachu Details');
    expect(pikachuDetails).toBeInTheDocument();
  });

  test('Testa também se a URL exibida no navegador muda para /pokemon/<id>', () => {
    const { history } = renderWithRouter(<App />);

    const link = screen.getByText(moreDetails);
    fireEvent.click(link);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  test('Testa se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(<App />);

    const link = screen.getByText(moreDetails);
    fireEvent.click(link);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    const favoriteIcon = screen.getByAltText('Pikachu is marked as favorite');
    expect(favoriteIcon.src).toBe('http://localhost/star-icon.svg');
    expect(favoriteIcon).toBeInTheDocument();
  });
});
