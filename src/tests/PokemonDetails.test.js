import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import myPersonalRender from './renderWithRouter';

const pikachuPath = '/pokemons/25';
const nameCheckbox = 'Pokémon favoritado?';

describe('Em detalhes do pokemon deve', () => {
  it('conter um texto "name Datails" onde nome é o nome do pokemon', () => {
    const { historico } = myPersonalRender(<App />);
    historico.push(pikachuPath);

    const pikachuDetail = screen.getByRole('heading', {
      level: 2,
      name: 'Pikachu Details',
    });

    expect(pikachuDetail).toBeInTheDocument();
  });

  it('não conter um link de detalhes do pokemon', () => {
    const { historico } = myPersonalRender(<App />);
    historico.push(pikachuPath);

    const notLink = screen.queryByRole('link', { name: 'More details' });

    expect(notLink).toBe(null);
  });

  it('conter um titulo nivel 2 com o texto "Summary"', () => {
    myPersonalRender(<App />);

    const link = screen.getByRole('link', { name: 'More details' });
    userEvent.click(link);

    const title = screen.getByRole('heading', {
      level: 2,
      name: 'Summary',
    });

    expect(title).toBeInTheDocument();
  });

  it('conter um paragrafo com um resumo sobre o pokemon especifico', () => {
    const { historico } = myPersonalRender(<App />);
    historico.push(pikachuPath);

    const paragrafo = screen.getByText(
      'This intelligent Pokémon roasts hard berries with '
      + 'electricity to make them tender enough to eat.',
    );

    expect(paragrafo).toBeInTheDocument();
  });
});

describe('A seção de mapas', () => {
  it('deve conter um titulo nivel 2 com o texto "Game Locations of <name>"', () => {
    const { historico } = myPersonalRender(<App />);
    historico.push(pikachuPath);

    const title = screen.getByRole('heading', {
      level: 2,
      name: 'Game Locations of Pikachu',
    });

    expect(title).toBeInTheDocument();
  });

  // it('deve estar dentro da seção de detalhes', () => {
  // });

  it('deve ixibir o nome da localização e uma imagem do mapa', () => {
    const { historico } = myPersonalRender(<App />);
    historico.push(pikachuPath);

    const maps = screen.getAllByAltText('Pikachu location');

    const mapUmName = screen.getByText('Kanto Viridian Forest');
    const mapUmImg = maps[0];

    const mapDoisName = screen.getByText('Kanto Power Plant');
    const mapDoisImg = maps[1];

    expect(mapUmName).toBeInTheDocument();
    expect(mapDoisName).toBeInTheDocument();

    expect(mapUmImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(mapDoisImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });
});

describe('A caixar de favoritas os pokemons', () => {
  it('existe e contém o nome "Pokémon favoritado?"', () => {
    const { historico } = myPersonalRender(<App />);
    historico.push(pikachuPath);

    const checkbox = screen.getByRole('checkbox', {
      name: nameCheckbox,
    });

    expect(checkbox).toBeInTheDocument();
  });

  it('ao clickar adiona, ao clikar novamente remove', () => {
    const { historico } = myPersonalRender(<App />);
    historico.push(pikachuPath);

    const desmarcada = screen.getByRole('checkbox', {
      name: nameCheckbox,
      checked: false,
    });
    userEvent.click(desmarcada);
    expect(desmarcada).toBeChecked();

    const marcada = screen.getByRole('checkbox', {
      name: nameCheckbox,
      checked: true,
    });
    userEvent.click(marcada);
    expect(marcada).not.toBeChecked();
  });
});
