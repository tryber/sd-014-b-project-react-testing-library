import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Requisito 02', () => {
  test(
    'Teste se página contém um heading h2 com o texto Encountered pokémons',
    () => {
      renderWithRouter(<App />);
      const title = screen.getByRole('heading', {
        level: 2,
        name: 'Encountered pokémons',
      });

      expect(title).toBeInTheDocument();
    },
  );

  test(
    'Se é exibido o próximo Pokémon da lista quando o botão Próximo pokémon é clicado',
    async () => {
      renderWithRouter(<App />);

      const button = screen.getByRole('button', { name: 'Próximo pokémon' });
      expect(button).toBeInTheDocument();

      userEvent.click(button);

      const nextPoke = screen.getByText('Charmander');
      expect(nextPoke).toBeInTheDocument();
    },
  );

  test(
    'Se é mostrado apenas um Pokémon por vez.',
    async () => {
      renderWithRouter(<App />);

      const button = screen.getByRole('button', { name: 'Próximo pokémon' });
      expect(button).toBeInTheDocument();

      userEvent.click(button);

      const nextPoke = screen.getByText('Charmander');
      expect(nextPoke).toBeInTheDocument();

      const onlyOnePoke = screen.getAllByTestId('pokemon-name');
      expect(onlyOnePoke.length).toEqual(1);
    },
  );

  test(
    'Se a Pokédex tem os botões de filtro',
    async () => {
      renderWithRouter(<App />);

      const buttonType = screen.getAllByTestId('pokemon-type-button');
      expect(buttonType[0]).toBeInTheDocument();
      const SEVEN = 7;
      expect(buttonType).toHaveLength(SEVEN);
      expect(buttonType[0]).toHaveTextContent('Electric');
      expect(buttonType[1]).toHaveTextContent('Fire');
      expect(buttonType[2]).toHaveTextContent('Bug');
      expect(buttonType[3]).toHaveTextContent('Poison');
      expect(buttonType[4]).toHaveTextContent('Psychic');
      expect(buttonType[5]).toHaveTextContent('Normal');
      expect(buttonType[6]).toHaveTextContent('Dragon');
    },
  );

  test(
    'Teste se a Pokédex contém um botão para resetar o filtro',
    () => {
      renderWithRouter(<App />);

      const buttonAll = screen.getByRole('button', { name: 'All' });
      expect(buttonAll).toBeInTheDocument();
      userEvent.click(buttonAll);
    },
  );
});
