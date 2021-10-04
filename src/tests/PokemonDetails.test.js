import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

const testIdPokemonName = 'pokemon-name';
const moreDetailsText = 'More details';
const favoriteLabelText = 'Pokémon favoritado?';
const pikachuPage = '/pokemons/25';

describe('Testa as informações detalhadas do Pokémon selecionado são mostradas na tela.',
  () => {
    test('a página deve conter um texto <name> Details', () => {
      const { history } = renderWithRouter(<App />);
      history.push(pikachuPage);

      const pokemonName = screen.getByTestId(testIdPokemonName).textContent;
      const h2 = screen.getByText(`${pokemonName} Details`);
      expect(h2).toBeInTheDocument();
    });

    test('não deve existir o link de navegação para os detalhes', () => {
      renderWithRouter(<App />);
      const moreDetailsBtn = screen.getByText(moreDetailsText);
      fireEvent.click(moreDetailsBtn);

      expect(moreDetailsBtn).not.toBeInTheDocument();
    });

    test('a seção de detalhes deve conter um heading h2 com o texto Summary', () => {
      const { history } = renderWithRouter(<App />);
      history.push(pikachuPage);

      const h2 = screen.getByRole('heading', { name: 'Summary' });
      expect(h2).toBeInTheDocument();
    });

    test('deve conter um parágrafo com o resumo do Pokémon específico sendo visualizado',
      () => {
        const { history } = renderWithRouter(<App />);
        history.push(pikachuPage);

        const pokemonName = screen.getByTestId(testIdPokemonName).textContent;
        const currentSummary = pokemons
          .find(({ name }) => name === pokemonName).summary;
        const summaryElement = screen.getByText(currentSummary);
        expect(summaryElement).toBeInTheDocument();
      });
  });

describe(
  'Testa se existe na página uma seção com os mapas contendo as localizações do pokémon',
  () => {
    test(
      `Na seção de detalhes deverá existir um heading h2 com o texto
      Game Locations of <name>; onde <name> é o nome do Pokémon exibido.`,
      () => {
        const { history } = renderWithRouter(<App />);
        history.push(pikachuPage);

        const pokemonName = screen.getByTestId(testIdPokemonName).textContent;
        const h2 = screen
          .getByRole('heading', { name: `Game Locations of ${pokemonName}` });
        expect(h2).toBeInTheDocument();
      },
    );

    test(
      'Devem ser exibidos o nome da localização e uma imagem do mapa em cada localização',
      () => {
        const { history } = renderWithRouter(<App />);
        history.push(pikachuPage);

        const pokemonName = screen.getByTestId(testIdPokemonName).textContent;
        const locations = pokemons
          .find(({ name }) => name === pokemonName).foundAt
          .map(({ location }) => location);
        locations.forEach((local) => {
          const locationElement = screen.getByText(local);
          expect(locationElement).toBeInTheDocument();
        });
      },
    );

    test(
      'A imagem da localização deve ter um atributo src com a URL da localização; ',
      () => {
        const { history } = renderWithRouter(<App />);
        history.push(pikachuPage);

        const pokemonName = screen.getByTestId(testIdPokemonName).textContent;
        const imgElements = screen
          .queryAllByAltText(`${pokemonName} location`);
        expect(imgElements).toBeTruthy();
        const imgs = pokemons
          .find(({ name }) => name === pokemonName).foundAt
          .map(({ map }) => map);

        imgs.forEach((img) => {
          expect(imgElements.some((element) => element.src === img)).toBeTruthy();
        });
      },
    );

    test('a imagem da localização deve ter um atributo alt com o texto <name> location',
      () => {
        const { history } = renderWithRouter(<App />);
        history.push(pikachuPage);

        const pokemonName = screen.getByTestId(testIdPokemonName).textContent;
        const imgElements = screen
          .queryAllByAltText(`${pokemonName} location`);
        const imgsLength = pokemons
          .find(({ name }) => name === pokemonName).foundAt
          .map(({ map }) => map).length;

        expect(imgElements.length).toBe(imgsLength);
      });
  },
);

describe(
  'Testa se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    test('A página deve exibir um checkbox que permite favoritar o Pokémon', () => {
      const { history } = renderWithRouter(<App />);
      history.push(pikachuPage);

      const favoriteBtn = screen.getByLabelText(favoriteLabelText);
      expect(favoriteBtn).toBeInTheDocument();
    });

    test(
      `Cliques alternados no checkbox devem adicionar
        e remover respectivamente o Pokémon da lista de favoritos;`,
      () => {
        const { history } = renderWithRouter(<App />);
        history.push(pikachuPage);
        const pokemonName = screen.getByTestId(testIdPokemonName).textContent;
        const favoriteBtn = screen.getByLabelText(favoriteLabelText);
        fireEvent.click(favoriteBtn);

        let favIcon = screen.getByAltText(`${pokemonName} is marked as favorite`);
        expect(favIcon).toBeInTheDocument();
        fireEvent.click(favoriteBtn);
        expect(favIcon).not.toBeInTheDocument();
        fireEvent.click(favoriteBtn);
        favIcon = screen.getByAltText(`${pokemonName} is marked as favorite`);
        expect(favIcon).toBeInTheDocument();

        history.push('/favorites');
        const pokemonFavorited = screen.getByText(pokemonName);
        expect(pokemonFavorited).toBeInTheDocument();
        favIcon = screen.getByAltText(`${pokemonName} is marked as favorite`);
        expect(favIcon).toBeInTheDocument();
      },
    );

    test('O label do checkbox deve conter o texto Pokémon favoritado?', () => {
      const { history } = renderWithRouter(<App />);
      history.push(pikachuPage);
      screen.getByLabelText(favoriteLabelText);
    });
  },
);
