import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const MORE_DETAILS_LINK = 'More details';

describe(`Test if the selected Pokémon's
  detailed information is shown on the screen`, () => {
  test(`if the page should contain a <name> Details text,
    where <name> is the name of the Pokémon`, () => {
    renderWithRouter(<App />);
    const moreDetailsLink = screen.getByRole('link', {
      name: MORE_DETAILS_LINK,
    });
    userEvent.click(moreDetailsLink);
    const title = screen.getByRole('heading', {
      level: 2,
      name: 'Pikachu Details',
    });
    expect(title).toBeInTheDocument();
  });
  test('if there is no navigation link to the selected Pokémon\'s details.', () => {
    renderWithRouter(<App />);
    const moreDetailsLink = screen.getByRole('link', {
      name: MORE_DETAILS_LINK,
    });
    userEvent.click(moreDetailsLink);
    expect(moreDetailsLink).not.toBeInTheDocument();
  });
  test('if the detail section contains a heading h2 with the text Summary.', () => {
    renderWithRouter(<App />);
    const moreDetailsLink = screen.getByRole('link', {
      name: MORE_DETAILS_LINK,
    });
    userEvent.click(moreDetailsLink);
    const sumary = screen.getByRole('heading', {
      level: 2,
      name: 'Summary',
    });
    expect(sumary).toBeInTheDocument();
  });
  test(`if the details section contains a paragraph
    summarizing the specific Pokémon.`, () => {
    renderWithRouter(<App />);
    const moreDetailsLink = screen.getByRole('link', {
      name: MORE_DETAILS_LINK,
    });
    userEvent.click(moreDetailsLink);
    const paragraph = screen.getByText(/This intelligent Pokémon roasts hard /i);
    expect(paragraph).toBeInTheDocument();
  });
});

describe(`Test if there is a section on the page
  with maps containing the pokemon's locations`, () => {
  test(`if there is a heading h2 with the text
   Game Locations of <name of displayed Pokémon>.`, () => {
    renderWithRouter(<App />);
    const moreDetailsLink = screen.getByRole('link', {
      name: MORE_DETAILS_LINK,
    });
    userEvent.click(moreDetailsLink);
    const locations = screen.getByRole('heading', {
      level: 2,
      name: 'Game Locations of Pikachu',
    });
    expect(locations).toBeInTheDocument();
  });
  test('if all Pokémon locations are shown in the details section.', () => {
    renderWithRouter(<App />);
    const moreDetailsLink = screen.getByRole('link', {
      name: MORE_DETAILS_LINK,
    });
    userEvent.click(moreDetailsLink);
    const mapsPokemon = screen.getAllByRole('img', {
      name: 'Pikachu location',
    });
    expect(mapsPokemon.length).toBe(2);
    expect(mapsPokemon[0])
      .toHaveAttribute('src',
        'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(mapsPokemon[1])
      .toHaveAttribute('src',
        'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(mapsPokemon[0]).toBeInTheDocument();
    expect(mapsPokemon[1]).toBeInTheDocument();
    const paragraphLocation1 = screen.getByText('Kanto Viridian Forest');
    const paragraphLocation2 = screen.getByText('Kanto Power Plant');
    expect(paragraphLocation1).toBeInTheDocument();
    expect(paragraphLocation2).toBeInTheDocument();
  });
});

describe(`Test if the user can bookmark
  a pokemon through the details page.`, () => {
  test('Test if the checkbox label must contain the text "Pokémon favoritado?"', () => {
    renderWithRouter(<App />);
    const moreDetailsLink = screen.getByRole('link', {
      name: MORE_DETAILS_LINK,
    });
    userEvent.click(moreDetailsLink);
    const favoriteInput = screen.getByLabelText('Pokémon favoritado?');
    expect(favoriteInput).toBeInTheDocument();
  });
  test(`if Alternate Clicks on the checkbox add
    or remove the Pokémon from the favorites list.`, () => {
    const { history } = renderWithRouter(<App />);
    const moreDetailsLink = screen.getByRole('link', {
      name: MORE_DETAILS_LINK,
    });
    userEvent.click(moreDetailsLink);
    const favoriteInput = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(favoriteInput);
    expect(favoriteInput).toBeChecked();
    history.push('/favorites');
    const pokemonName = screen.getByText('Pikachu');
    expect(pokemonName).toBeInTheDocument();
    history.push('/pokemons/25');
    userEvent.click(favoriteInput);
    expect(favoriteInput).not.toBeChecked();
    history.push('/favorites');
    expect(pokemonName).not.toBeInTheDocument();
  });
});
