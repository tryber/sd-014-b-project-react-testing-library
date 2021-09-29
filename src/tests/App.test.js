import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderRoute from '../helper/renderRoute';

describe('1 - Crie links de navegação para as páginas', () => {
  test('Se a página possui o link para "About"', () => {
    const { history } = renderRoute('/');

    userEvent.click(screen.getByRole('link', { name: 'About' }));

    expect(screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    })).toBeInTheDocument();

    expect(history.location.pathname).toBe('/about');
  });

  test('Se a página possui o link para "Home"', () => {
    const { history } = renderRoute('/about');

    expect(history.location.pathname).toBe('/about');

    userEvent.click(screen.getByRole('link', { name: 'Home' }));

    expect(screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    })).toBeInTheDocument();
  });

  test('Se a página possui o link para "Favorite Pokémons"', () => {
    const { history } = renderRoute('/');

    userEvent.click(screen.getByRole('link', { name: 'Favorite Pokémons' }));

    expect(screen.getByRole('heading', {
      level: 2,
      name: 'Favorite pokémons',
    })).toBeInTheDocument();

    expect(history.location.pathname).toBe('/favorites');
  });
});
