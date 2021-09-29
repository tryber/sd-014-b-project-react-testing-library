import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderRoute from '../helper/renderRoute';

describe('2 - Crie a página "About", com detalhes da pokedex', () => {
  const firstParagraph = /This application simulates a Pokédex,/i;
  const secondParagraph = /can filter Pokémons by type, and see more details/;
  const imgURL = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

  test('Se a página possui um texto sobre a pokedex', () => {
    const { history } = renderRoute('/');

    userEvent.click(screen.getByRole('link', { name: 'About' }));
    expect(history.location.pathname).toBe('/about');

    expect(screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    })).toBeInTheDocument();

    expect(screen.getByText(firstParagraph)).toBeInTheDocument();
    expect(screen.getByText(secondParagraph)).toBeInTheDocument();
  });

  test('Se a página possui a imagem correta da pokedex', () => {
    const { history } = renderRoute('/');

    userEvent.click(screen.getByRole('link', { name: 'About' }));
    expect(history.location.pathname).toBe('/about');

    const expectedImg = screen.getByRole('img');
    expect(expectedImg).toBeInTheDocument();
    expect(expectedImg.src).toBe(imgURL);
  });
});
