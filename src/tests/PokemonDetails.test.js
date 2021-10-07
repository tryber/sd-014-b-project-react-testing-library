import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './services/renderWithRouter';
import App from '../App';

describe('Verifica se renderiza a página de detalhes do Pokémon da forma correta', () => {
  const moreDetails = 'More details';

  it(`Deveria, ao se clicar no botão "More details",
   a partir da página inicial, renderizar a página de detalhamento do pokémon`, () => {
    renderWithRouter(<App />);
    const linkToPikachuDetails = screen.getByText(moreDetails);
    userEvent.click(linkToPikachuDetails);
    const pikachuDetailsHeading = screen.getByRole('heading', {
      level: 2, name: 'Pikachu Details',
    });

    expect(pikachuDetailsHeading).toBeInTheDocument();
  });

  it('Deveria renderizar o sumário do pokémon Pikachu', () => {
    renderWithRouter(<App />);
    const linkToPikachuDetails = screen.getByText(moreDetails);
    userEvent.click(linkToPikachuDetails);
    const pikachuSummaryHeading = screen.getByRole('heading', {
      level: 2, name: 'Summary',
    });

    const pikachuSummaryText = /This intelligent Pokémon roasts/;
    const pikachuSummary = screen.getByText(pikachuSummaryText);

    expect(pikachuSummaryHeading).toBeInTheDocument();
    expect(pikachuSummary).toBeInTheDocument();
  });

  it('Deveria renderizar o título "Game Locations of Pikachu"', () => {
    renderWithRouter(<App />);
    const linkToPikachuDetails = screen.getByText(moreDetails);
    userEvent.click(linkToPikachuDetails);
    const pikachuLocationsHeading = screen.getByRole('heading', {
      level: 2, name: 'Game Locations of Pikachu',
    });

    expect(pikachuLocationsHeading).toBeInTheDocument();
  });

  it('Deveria renderizar os mapas contendo a localização do Pokémon Pikachu', () => {
    renderWithRouter(<App />);
    const linkToPikachuDetails = screen.getByText(moreDetails);
    userEvent.click(linkToPikachuDetails);

    const altText = 'Pikachu location';
    const locationMaps = screen.getAllByAltText(altText);

    expect(locationMaps).toHaveLength(2);
    expect(locationMaps[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(locationMaps[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  it('Deveria renderizar o checkbox de favoritar o pokémon da maneira correta', () => {
    renderWithRouter(<App />);
    const linkToPikachuDetails = screen.getByText(moreDetails);
    userEvent.click(linkToPikachuDetails);

    const favoriteCheckbox = screen.getByLabelText('Pokémon favoritado?');
    expect(favoriteCheckbox).toBeInTheDocument();
  });
});
