import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testando componente PokemonDetails', () => {
  test(`As informções do pokemon selecionado devem ser
   mostradas na tela`, () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getByText('Psychic'));
    fireEvent.click(screen.getByText('More details'));
    const findText = screen.getByText('Alakazam Details');
    const summaryH2 = screen.getAllByRole('heading', { level: 2 })[1];

    const summaryText = screen.getByText(/Summary/);

    const gameLocationText = screen.getByText('Game Locations of Alakazam');

    const paragraph = screen.getByText(/Closing both its eyes heightens/i);

    const location = screen.getByText('Unova Accumula Town');

    const imageMap = screen.getAllByRole('img')[1];

    expect(findText).toBeInTheDocument();
    expect(summaryH2).toBeInTheDocument();
    expect(summaryText).toBeInTheDocument();
    expect(gameLocationText).toBeInTheDocument();
    expect(paragraph).toBeInTheDocument();
    expect(location).toBeInTheDocument();
    expect(imageMap).toHaveProperty('src', 'https://cdn2.bulbagarden.net/upload/4/44/Unova_Accumula_Town_Map.png');
    expect(imageMap).toHaveProperty('alt', 'Alakazam location');
  });

  test('Deve ser possível favoritar o pokemon na página de detalhes', () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getByText('Psychic'));
    fireEvent.click(screen.getByText('More details'));

    const findCheckBox = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    fireEvent.click(findCheckBox);
    expect(findCheckBox).toBeChecked();
    fireEvent.click(findCheckBox);
    expect(findCheckBox).not.toBeChecked();

    expect(findCheckBox).toBeInTheDocument();
  });
});
