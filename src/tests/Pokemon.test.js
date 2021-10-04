import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testando componente Pokemon', () => {
  test('se é renderizado a imagem do pokemon', () => {
    renderWithRouter(<App />);
    const imagemPikachu = screen.getByRole('img');
    expect(imagemPikachu).toHaveAttribute('src',
      'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test('se o nome corresponde ao Pokemon', () => {
    renderWithRouter(<App />);
    const altPikachu = screen.getByRole('img');
    expect(altPikachu).toHaveAttribute('alt',
      'Pikachu sprite');
  });

  test('se o nome do pokemon esta correto', () => {
    renderWithRouter(<App />);
    const nomePikachu = screen.getByText('Pikachu');
    expect(nomePikachu).toBeInTheDocument();
  });

  test('se o tipo do pokemon esta correto', () => {
    renderWithRouter(<App />);
    const tipoPikachu = screen.getAllByText('Electric');
    expect(tipoPikachu.length).toStrictEqual(2);
  });

  test('se o peso do pokemon aparece', () => {
    renderWithRouter(<App />);
    const pesoPokemon = screen.getByText('Average weight: 6.0 kg');
    expect(pesoPokemon).toBeInTheDocument();
  });

  test('se o card do Pokémon indicado na Pokédex contém um link de navegação', () => {
    renderWithRouter(<App />);
    const linkMaisInf = screen.getByRole('link', { name: 'More details' });
    expect(linkMaisInf).toBeInTheDocument();
    userEvent.click(linkMaisInf);
    const summary = screen.getByText('Summary');
    expect(summary).toBeInTheDocument();
  });

  test('se aparece uma estrela no pokemon favorito', () => {
    renderWithRouter(<App />);
    const linkMaisInf = screen.getByRole('link', { name: 'More details' });
    userEvent.click(linkMaisInf);

    const favoritar = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    userEvent.click(favoritar);

    const img = screen.getByAltText(/is marked as favorite/);
    expect(img).toHaveAttribute('src', '/star-icon.svg');
  });
});
