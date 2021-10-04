import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

describe('Teste o componente <PokemonDetails.js />', () => {
  it(`Teste se as informações detalhadas do Pokémon
   selecionado são mostradas na tela.`, () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(moreDetails);

    const text = screen.getByRole('heading', { level: 2, name: 'Pikachu Details' });
    expect(text).toBeInTheDocument();

    expect(moreDetails).not.toBeInTheDocument();

    const sumary = screen.getByRole('heading', { level: 2, name: 'Summary' });
    expect(sumary).toBeInTheDocument();

    const paragraf = screen.getByText(/hard berries with electricity/);
    expect(paragraf).toBeInTheDocument();
  });

  it(`Teste se existe na página uma seção com os mapas
   contendo as localizações do pokémon`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');

    const h2 = screen.getByRole('heading', { level: 2,
      name: 'Game Locations of Pikachu' });
    expect(h2).toBeInTheDocument();

    const img = screen.getAllByAltText('Pikachu location');
    expect(img.length).toEqual(2);

    expect(img[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(img[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  it(`Teste se o usuário pode favoritar um 
  pokémon através da página de detalhes.`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');

    const checkbox = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    userEvent.click(checkbox);
    const star = screen.getByAltText(/Pikachu is marked as favorite/);
    expect(star).toHaveAttribute('src', '/star-icon.svg');

    userEvent.click(checkbox);
    expect(star).not.toBeInTheDocument();
  });
});
