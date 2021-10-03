import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando o componente About', () => {
  it('se a página contém um heading h2 com o texto About Pokédex.', () => {
    renderWithRouter(<App />);
    const about = screen.getByText('About');
    userEvent.click(about);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent('About Pokédex');
  });

  it('se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    renderWithRouter(<App />);
    const about = screen.getByText('About');
    userEvent.click(about);
    const firstParagraph = screen.getByText('This application simulates a Pokédex, a '
    + 'digital encyclopedia containing all Pokémons');
    expect(firstParagraph).toBeInTheDocument();
    const secondParagraph = screen.getByText('One can filter Pokémons by type,'
    + ' and see more details for each one of them');
    expect(secondParagraph).toBeInTheDocument();
  });

  it('se a página contém a seguinte imagem de uma Pokédex:', () => {
    renderWithRouter(<App />);
    const about = screen.getByText('About');
    userEvent.click(about);
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute(
      'src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/'
      + '800px-Gen_I_Pok%C3%A9dex.png',
    );
  });
});
