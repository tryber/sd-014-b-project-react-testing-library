import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../components/renderWithRouter';

describe('Testa o PokemonDetails', () => {
  test('Testa se as informações detalhadas são mostradas na tela', () => {
    renderWithRouter(<App />);
    const moreDetailsLink = screen.getByRole('link', { name: 'More details' });
    expect(moreDetailsLink).toBeInTheDocument();
    userEvent.click(moreDetailsLink);
    expect(moreDetailsLink).not.toBeInTheDocument();
    const pokemonDetailsText = screen.getByRole('heading', {
      level: 2,
      name: 'Pikachu Details',
    });
    expect(pokemonDetailsText).toBeInTheDocument();
    const summaryHeading = screen.getByRole('heading', {
      level: 2,
      name: 'Summary',
    });
    expect(summaryHeading).toBeInTheDocument();
    const summaryParagraph = screen.getByText('This intelligent', { exact: false });
    expect(summaryParagraph).toBeInTheDocument();
  });
});
