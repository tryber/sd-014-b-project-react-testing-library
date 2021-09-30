import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testa componente `<PokemonDetails.js />`', () => {
  const { name, summary, foundAt } = pokemons[0];
  const path = '/pokemons/25';
  describe(`Testa se as informações detalhadas do Pokémon selecionado
  são mostradas na tela.`, () => {
    test('se a página contém um texto <name> Details, onde <name> é o nome do Pokémon',
      () => {
        const { history } = renderWithRouter(<App />);
        history.push(path);
        const titleDetail = screen.getByRole('heading', {
          name: `${name} Details`,
        });
        expect(titleDetail).toBeInTheDocument();
      });

    test(`se a página contém um heading h2 com o texto Summary
    e um parágrafo com o resumo de um Pokémon`,
    () => {
      const { history } = renderWithRouter(<App />);
      history.push(path);
      const summaryText = screen.getByRole('heading', {
        level: 2,
        name: 'Summary',
      });
      expect(summaryText).toBeInTheDocument();

      const summaryParagraph = screen.getByText(summary);
      expect(summaryParagraph).toBeInTheDocument();
    });
  });

  describe(`Teste se existe na página uma seção com os mapas contendo as localizações
  do pokémon`, () => {
    test(`se renderiza um heading h2 com o texto Game Locations of <name>;
    onde <name> é o nome do Pokémon exibido.`, () => {
      const { history } = renderWithRouter(<App />);
      history.push(path);

      const titleGameLocation = screen.getByRole('heading', {
        level: 2,
        name: `Game Locations of ${name}`,
      });
      expect(titleGameLocation).toBeInTheDocument();
    });

    test(`se todas as localizações do Pokémon são mostradas
    na seção de detalhes`, () => {
      const { history } = renderWithRouter(<App />);
      history.push(path);

      const locationName = screen.getByText('Kanto Viridian Forest');
      expect(locationName).toBeInTheDocument();
    });

    test('se existe uma imagem com src e alt', () => {
      const { history } = renderWithRouter(<App />);
      history.push(path);

      const mapImage = screen.getAllByAltText('Pikachu location');
      expect(mapImage.length).toBe(foundAt.length);
      expect(mapImage[0]).toHaveAttribute('src', foundAt[0].map);
      expect(mapImage[1]).toHaveAttribute('src', foundAt[1].map);
    });
  });

  describe(`Teste se o usuário pode favoritar um pokémon
  através da página de detalhes.`, () => {
    test('se existe um checkbox que permite favoritar', () => {
      const { history } = renderWithRouter(<App />);
      history.push(path);

      const checkbox = screen.getByLabelText('Pokémon favoritado?');
      expect(checkbox).toBeInTheDocument();

      userEvent.click(checkbox);

      const pokemonFavoritado = screen.getByRole('checkbox', { checked: true });
      expect(pokemonFavoritado).toBeInTheDocument();
    });
  });
});
