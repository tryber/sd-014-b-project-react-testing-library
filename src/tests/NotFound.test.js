import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste o componente NotFound', () => {
  it('Teste se página contém um heading h2 com o texto Page requested not found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pagina/que-nao-existe/');
    const pageNotFound = screen.getByRole('heading', { level: 2 });
    expect(pageNotFound).toHaveTextContent(/Page requested not found/i);
  });

  it('Teste se página mostra a imagem', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pagina/que-nao-existe/');
    const imageNotFound = screen.getByAltText(/Pikachu crying because the page/i);
    expect(imageNotFound).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
