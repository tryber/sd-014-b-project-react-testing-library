import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import App from '../App';

const MORE_DETAILS = 'More details';

test('se as informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
  const customHistory = createMemoryHistory();
  render(
    <Router history={ customHistory }>
      <App />
    </Router>,
  );

  const getMoreDetails = screen.getByRole('link', { name: MORE_DETAILS });

  userEvent.click(getMoreDetails);

  const getH2Pikachu = screen.getByRole('heading', { name: 'Pikachu Details' });

  expect(getH2Pikachu).toBeInTheDocument();

  const getSummary = screen.getByRole('heading', { name: 'Summary' });

  expect(getSummary).toBeInTheDocument();

  const paragraphOne = 'This intelligent Pokémon roasts hard berries ';
  const paragraphTwo = 'with electricity to make them tender enough to eat.';
  const allParagraph = paragraphOne + paragraphTwo;

  const getParagraph = screen.getByText(allParagraph);
  expect(getParagraph).toBeInTheDocument();
});

test(`se existe na página uma seção com
 os mapas contendo as localizações do pokémon`, () => {
  const customHistory = createMemoryHistory();
  render(
    <Router history={ customHistory }>
      <App />
    </Router>,
  );

  const getMoreDetails = screen.getByRole('link', { name: MORE_DETAILS });

  userEvent.click(getMoreDetails);

  const getLocation = screen.getByRole('heading', { name: 'Game Locations of Pikachu' });

  expect(getLocation).toBeInTheDocument();

  const localOne = screen.getByText('Kanto Viridian Forest');
  const localTwo = screen.getByText('Kanto Power Plant');

  expect(localOne).toBeInTheDocument();
  expect(localTwo).toBeInTheDocument();

  const getImgs = screen.getAllByRole('img');

  expect(getImgs[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  expect(getImgs[1]).toHaveAttribute('alt', 'Pikachu location');
  expect(getImgs[2]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  expect(getImgs[2]).toHaveAttribute('alt', 'Pikachu location');
});

test('se o usuário pode favoritar um pokémon através da página de detalhes.', () => {
  const customHistory = createMemoryHistory();
  render(
    <Router history={ customHistory }>
      <App />
    </Router>,
  );

  const getMoreDetails = screen.getByRole('link', { name: MORE_DETAILS });

  userEvent.click(getMoreDetails);

  const getCheckBox = screen.getByRole('checkbox');
  console.log(getCheckBox);

  expect(getCheckBox).toBeInTheDocument();

  userEvent.click(getCheckBox);
  const getImgs = screen.getAllByRole('img');

  expect(getImgs[1]).toHaveAttribute('src', '/star-icon.svg');
  expect(getImgs[1]).toHaveAttribute('alt', 'Pikachu is marked as favorite');

  const getLabelText = screen.getByText('Pokémon favoritado?');
  expect(getLabelText).toBeInTheDocument();
});
