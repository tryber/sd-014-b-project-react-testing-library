import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <App.js />', () => {
  test('Testa se o topo da aplicação contém um conjunto fixo de links de navegação.',
    () => {
      renderWithRouter('/');
      const nav = screen.getByRole('navigation');

      expect(nav).toBeInTheDocument();
    });

  test('Testa se o primeiro link possuí o texto Home.', () => {
    renderWithRouter('/');
    const link = screen.getByRole('link', { name: 'Home' });

    expect(link).toBeInTheDocument();
  });

  test('Testa se o segundo link possuí o texto About.', () => {
    renderWithRouter('/');
    const link = screen.getByRole('link', { name: 'About' });

    expect(link).toBeInTheDocument();
  });

  test('Testa se o terceiro link possuí o texto Favorite Pokémons.', () => {
    renderWithRouter('/');
    const link = screen.getByRole('link', { name: 'Favorite Pokémons' });

    expect(link).toBeInTheDocument();
  });
});

describe('Teste se os links da aplicação estão funcionando:;',
  () => {
    test('Testando o link Home.', () => {
      renderWithRouter('/about');
      const h2 = screen.getByRole('heading', { name: 'About Pokédex' });
      expect(h2).toBeInTheDocument();
      const home = screen.getByRole('link', { name: 'Home' });
      userEvent.click(home);

      expect(window.location.pathname).toBe('/');
    });

    test('Testando o link About.', () => {
      renderWithRouter('/');
      const h2 = screen.getByRole('heading', { name: 'Encountered pokémons' });
      expect(h2).toBeInTheDocument();
      const about = screen.getByRole('link', { name: 'About' });
      userEvent.click(about);

      expect(window.location.pathname).toBe('/about');
    });

    test('Testando o link Favorite Pokémons.', () => {
      renderWithRouter('/');
      const h2 = screen.getByRole('heading', { name: 'Encountered pokémons' });
      expect(h2).toBeInTheDocument();
      const about = screen.getByRole('link', { name: 'Favorite Pokémons' });
      userEvent.click(about);

      expect(window.location.pathname).toBe('/favorites');
    });
  });
