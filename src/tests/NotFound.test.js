import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

const NOT_FOUND = '/pagina-que-não-existe';

describe('4 - Teste o componente NotFound', () => {
  it('se página contém um heading h2 com o texto "Page requested not found 😭"', () => {
    const { history } = renderWithRouter(<App />);
    history.push(NOT_FOUND);

    const { pathname } = history.location;
    expect(pathname).toBe(NOT_FOUND);

    const title = screen.getByRole('heading', { level: 2,
      name: /Page requested not found/i,
      exact: false });
    expect(title).toBeInTheDocument();
  });

  it('se a página contém uma imagem', () => {
    const { history } = renderWithRouter(<App />);
    history.push(NOT_FOUND);

    const { pathname } = history.location;
    expect(pathname).toBe(NOT_FOUND);

    const imgPokedex = screen.getByRole('img', { name: /Pikachu crying/i });
    const urlImg = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(imgPokedex).toHaveAttribute('src', urlImg);
  });
});
