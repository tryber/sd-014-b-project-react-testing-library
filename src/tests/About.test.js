import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';

describe('Testando o componente <About.js />.', () => {
  test('Teste se a página contém as informações sobre a Pokédex.',
    () => {
      renderWithRouter('/about');
      const textPt1 = 'This application simulates a Pokédex, ';
      const textPt2 = 'a digital encyclopedia containing all Pokémons';
      const allText = `${textPt1}${textPt2}`;

      const aboutPokedex = screen.getByText(allText);

      expect(aboutPokedex).toBeInTheDocument();
    });

  test('Testando se a página contém um heading h2 com o texto About Pokédex.',
    () => {
      renderWithRouter('/about');
      const h2 = screen.getByRole('heading', { name: 'About Pokédex' });
      expect(h2).toBeInTheDocument();
    });

  test('Testando se a página contém dois parágrafos com texto sobre a Pokédex.',
    () => {
      renderWithRouter('/about');
      const textPt1 = 'This application simulates a Pokédex, ';
      const textPt2 = 'a digital encyclopedia containing all Pokémons';
      const allText = `${textPt1}${textPt2}`;

      const paragraph1 = screen.getByText(allText);

      const pText = 'One can filter Pokémons by type, ';
      const pText2 = `${pText}and see more details for each one of them`;

      const paragraph2 = screen.getByText(pText2);

      expect(paragraph1).toBeInTheDocument();
      expect(paragraph2).toBeInTheDocument();
    });

  test('Teste se a página contém a seguinte imagem de uma Pokédex.',
    () => {
      renderWithRouter('/about');
      const img = screen.getByRole('img');

      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    });
});
