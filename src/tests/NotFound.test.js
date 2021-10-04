import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testando o componente NotFound', () => {
  test(`Teste se página contém um heading h2 com o texto
   Page requested not found 😭`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('/rota-desconhecida');

    const emoj = screen.getByLabelText('Crying emoji', { selector: 'span' });
    const title = screen.getByText('Page requested not found');
    const findH2 = screen.getByRole('heading', { level: 2 });

    expect(title).toBeInTheDocument();
    expect(emoj).toBeInTheDocument();
    expect(findH2).toBeInTheDocument();
  });

  test('Teste se página mostra a imagem', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/rota-desconhecida');

    const imageNofFound = screen.getAllByRole('img');
    // console.log(imageNofFound[1])

    expect(imageNofFound[1]).toBeInTheDocument();
    expect(imageNofFound[1]).toHaveProperty('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
