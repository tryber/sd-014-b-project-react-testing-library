import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente <About.js />', () => {
  test('Teste se a página contém as informações sobre a Pokédex', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');
    const firstParaPhrase1 = 'This application simulates a Pokédex,';
    const firstParaPhrase2 = ' a digital encyclopedia containing all Pokémons';
    const firstParagraph = screen.getByText(firstParaPhrase1 + firstParaPhrase2);
    const secParaPhrse1 = 'One can filter Pokémons by type,';
    const secParaPhrse2 = ' and see more details for each one of them';
    const secondParagraph = screen.getByText(secParaPhrse1 + secParaPhrse2);
    expect(firstParagraph).toBeInTheDocument();
    expect(secondParagraph).toBeInTheDocument();
  });
  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');

    const title = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });

    expect(title).toBeInTheDocument();
  });
  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');
    const firstParaPhrase1 = 'This application simulates a Pokédex,';
    const firstParaPhrase2 = ' a digital encyclopedia containing all Pokémons';
    const firstParagraph = screen.getByText(firstParaPhrase1 + firstParaPhrase2);
    const secParaPhrse1 = 'One can filter Pokémons by type,';
    const secParaPhrse2 = ' and see more details for each one of them';
    const secondParagraph = screen.getByText(secParaPhrse1 + secParaPhrse2);
    expect(firstParagraph).toBeInTheDocument();
    expect(secondParagraph).toBeInTheDocument();
  });
  test(`Teste se a página contém a seguinte imagem de uma Pokédex: 
  https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png`,
  () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');

    const image = screen.getByAltText('Pokédex');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://cdn2q.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png')
  });
});
