import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Verifições no componente About', () => {
  it('Should have a title Pokedéx', () => {
    renderWithRouter(<App />);

    const linkAbout = screen.getByText('About');
    userEvent.click(linkAbout);

    const titlePokedex = screen.getByRole('heading', {
      level: 1,
      name: 'Pokédex',
    });
    expect(titlePokedex).toBeInTheDocument();
  });

  it('Should have a sub-title About Pokedéx', () => {
    renderWithRouter(<App />);

    const linkAbout = screen.getByText('About');
    userEvent.click(linkAbout);

    const subTitlePokedex = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(subTitlePokedex).toBeInTheDocument();
  });

  it('Should have two paragraph', () => {
    renderWithRouter(<App />);

    const linkAbout = screen.getByText('About');
    userEvent.click(linkAbout);

    const paragraph1 = screen
      .getByText(
        'This application simulates a Pokédex,'
        + ' a digital encyclopedia containing all Pokémons',
      );
    expect(paragraph1).toBeInTheDocument();

    const paragraph2 = screen
      .getByText(
        'One can filter Pokémons by type, and see more details for each one of them',
      );
    expect(paragraph2).toBeInTheDocument();
  });

  it('Should have a image', () => {
    renderWithRouter(<App />);

    const linkAbout = screen.getByText('About');
    userEvent.click(linkAbout);

    const img = screen.getByAltText('Pokédex');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
