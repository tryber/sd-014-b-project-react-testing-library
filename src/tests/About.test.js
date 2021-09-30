import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testes do componente <About.js />.', () => {
  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    renderWithRouter(<App />);
    const about = screen.getByText('About');

    userEvent.click(about);

    const TEXT_ONE = 'This application simulates a Pokédex';
    const TEXT_TWO = ', a digital encyclopedia containing all Pokémons';
    const TEXT_THREE = 'One can filter Pokémons by type';
    const TEXT_FOUR = ', and see more details for each one of them';

    const firstParagraph = screen.getByText(`${TEXT_ONE}${TEXT_TWO}`);
    expect(firstParagraph).toBeInTheDocument();

    const secondParagraph = screen.getByText(`${TEXT_THREE}${TEXT_FOUR}`);
    expect(secondParagraph).toBeInTheDocument();
  });

  it('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    renderWithRouter(<App />);
    const about = screen.getByText('About');

    userEvent.click(about);

    const title = screen.getByRole('heading', { level: 2, name: 'About Pokédex' });
    expect(title).toBeInTheDocument();
  });

  it('Teste se a página contém a seguinte imagem necessária ', () => {
    renderWithRouter(<App />);
    const about = screen.getByText('About');

    userEvent.click(about);

    const LINK_IMG = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    const imgPokedex = screen.getByRole('img');
    expect(imgPokedex).toHaveAttribute('src', LINK_IMG);
  });
});
