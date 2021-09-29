import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('4 - Teste o componente NotFound', () => {
  it('se página contém um heading h2 com o texto "Page requested not found 😭"', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/paginaquenãoexiste');

    const { pathname } = history.location;
    expect(pathname).toBe('/paginaquenãoexiste');

    const title = screen.getByRole('heading', { level: 2,
      name: /Page requested not found/i,
      exact: false });
    expect(title).toBeInTheDocument();
  });

  it('se a página contém uma imagem', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pagina-que-não-existe');

    const { pathname } = history.location;
    expect(pathname).toBe('/pagina-que-não-existe');

    const imgPokedex = screen.getByRole('img', { name: /Pikachu crying/i });
    const urlImg = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(imgPokedex).toHaveAttribute('src', urlImg);
  });
});
