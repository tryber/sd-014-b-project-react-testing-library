import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Requisito 7 - Pokemon details test', () => {
  test('Se a página tem um texto name> Details, onde <name> é o nome do Pokémon', () => {
    renderWithRouter(<App />);
    const navegationLink = screen.getByRole('link', { name: /More details/ });
    userEvent.click(navegationLink);
    expect(navegationLink).not.toBeInTheDocument();

    const detailstext = screen.getByRole('heading', {
      level: 2, name: /Pikachu Details/ });
    expect(detailstext).toBeInTheDocument();

    const summaryText = screen.getByRole('heading', {
      level: 2, name: 'Summary' });
    expect(summaryText).toBeInTheDocument();

    const detailsSection = screen.getByText(/This intelligent Pokémon roasts hard/);
    expect(detailsSection).toBeInTheDocument();
  });

  test('Se existe na página uma seção com os mapas de localizações do pokémon', () => {
    renderWithRouter(<App />);
    const favoriteList = screen.getByRole('link', { name: /More details/ });
    userEvent.click(favoriteList);

    const pokeMaps = screen.getByRole('heading', {
      level: 2, name: /Game Locations of Pikachu/ });
    expect(pokeMaps).toBeInTheDocument();

    // Ref:https://github.com/tryber/sd-014-b-project-react-testing-library/pull/1/files
    const mapsPage = screen.getAllByAltText(/Pikachu location/);
    expect(mapsPage.length).toBe(2);
    expect(mapsPage[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  });

  test('Se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    renderWithRouter(<App />);
    const favoriteList = screen.getByRole('link', { name: /More details/ });
    userEvent.click(favoriteList);

    const favoriteCheck = screen.getByRole('checkbox');
    userEvent.click(favoriteCheck);

    const favoriteLabel = screen.getByLabelText('Pokémon favoritado?');
    expect(favoriteLabel).toBeInTheDocument();
  });
});
