import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RenderWithRouter from './RenderWithRouter';
import App from '../App';

const moreDetailsText = 'More details';

describe('Testa o componente Pokemon.js', () => {
  test('se existe um ícone de estrela nos Pokémons favoritados', () => {
    RenderWithRouter(<App />);
    const detailsButton = screen.getByRole('link', {
      name: moreDetailsText,
    });
    userEvent.click(detailsButton);

    const favoriteInput = screen.getByRole('checkbox');
    userEvent.click(favoriteInput);

    const img = screen.getByAltText(/Pikachu is marked/);
    expect(img).toHaveAttribute('src', '/star-icon.svg');
  });

  test('se é renderizado um card com as informações de determinado pokémon', () => {
    RenderWithRouter(<App />);
    const namePokemon = screen.getByTestId('pokemon-name');
    expect(namePokemon).toHaveTextContent('Pikachu');

    const typePokemon = screen.getByTestId('pokemon-type');
    expect(typePokemon).toHaveTextContent('Electric');

    const weightPokemon = screen.getByTestId('pokemon-weight');
    expect(weightPokemon).toHaveTextContent(/Average weight: 6.0 kg/);

    const imgPokemon = screen.getByAltText(/sprite/);
    expect(imgPokemon).toHaveAttribute('src',
      'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test(`se o card do Pokémon indicado na Pokédex contém um link de navegação
    para exibir detalhes deste Pokémon. O link deve possuir a URL /pokemons/<id>,
    onde <id> é o id do Pokémon exibido`, () => {
    const { history } = RenderWithRouter(<App />);
    const detailsButton = screen.getByRole('link', {
      name: moreDetailsText,
    });
    userEvent.click(detailsButton);
    expect(history.location.pathname).toBe('/pokemons/25');

    history.push('/');

    const poisonButton = screen.getByRole('button', {
      name: 'Poison',
    });
    userEvent.click(poisonButton);
    const detailsButton2 = screen.getByRole('link', {
      name: moreDetailsText,
    });
    userEvent.click(detailsButton2);
    expect(history.location.pathname).toBe('/pokemons/23');
  });

  test('se existe um ícone de estrela nos Pokémons favoritados.', () => {
    const { history } = RenderWithRouter(<App />);
    history.push('/pokemons/143');

    const favoriteInput = screen.getByRole('checkbox');
    userEvent.click(favoriteInput);

    const favoriteIcon = screen.getByAltText('Snorlax is marked as favorite');
    expect(favoriteIcon).toHaveAttribute('src', '/star-icon.svg');
  });
});
