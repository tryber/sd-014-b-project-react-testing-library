import React from 'react';
import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

afterEach(cleanup);

describe('applies tests for component', () => {
  it('should contain a header', () => {
    renderWithRouter(<App />);
    const title = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(title).toBeInTheDocument();
  });
  it('should swipe next whenever the button is clicked', () => {
    renderWithRouter(<App />);
    const nextButton = screen.getByText('Próximo pokémon');
    expect(nextButton.type).toBe('button');

    const pikachu = screen.queryByAltText('Pikachu sprite');
    expect(pikachu).toBeInTheDocument();

    userEvent.click(nextButton);
    expect(screen.queryByAltText('Pikachu sprite')).not.toBeInTheDocument();
    const charmander = screen.getByAltText('Charmander sprite');
    expect(charmander).toBeInTheDocument();
  });
});
