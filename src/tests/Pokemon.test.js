import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokemon.js />', () => {
  test(`'Teste se é renderizado um card 
  com as informações de determinado pokémon.'`, () => {
    renderWithRouter(<App />);
    const pikachuButton = screen.getByRole('button', { name: 'Electric' });
    userEvent.click(pikachuButton);
    const name = screen.getByTestId('pokemon-name');
    const type = screen.getByTestId('pokemon-type');
    const weight = screen.getByTestId('pokemon-weight');
    const image = screen.getByAltText('Pikachu sprite');

    expect(name.textContent).toBe('Pikachu');
    expect(type.textContent).toBe('Electric');
    expect(weight.textContent).toBe('Average weight: 6.0 kg');
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
  test(`'Teste se o card do Pokémon indicado 
  na Pokédex contém um link de navegação'`, () => {
    const { history } = renderWithRouter(<App />);
    const moreDetailsLink = screen.getByRole('link', { name: 'More details' });
    expect(moreDetailsLink).toBeInTheDocument();
    userEvent.click(moreDetailsLink);
    expect(history.location.pathname).toBe('/pokemons/25');
  });
  // Ref.: https://github.com/tryber/sd-014-b-project-react-testing-
  // library/pull/64/commits/b60809f40d6fa69e5780e967600cd1871ecc7436
  test('\'se existe um ícone de estrela nos Pokémons favoritados.\'', () => {
    renderWithRouter(<App />);

    const linkDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(linkDetails);

    const checkPokemon = screen.getByRole('checkbox');
    userEvent.click(checkPokemon);

    const favImgStar = screen.getByAltText('Pikachu is marked as favorite');
    expect(favImgStar).toHaveAttribute('src', '/star-icon.svg');
  });
});
