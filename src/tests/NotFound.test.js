import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testes do componente <NotFound.js />', () => {
  it('Se página contém um h2 com o texto Page requested not found 😭;', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/notExist');

    const title = screen.getByRole('heading', { level: 2,
      name: /Page requested not found/i,
      exact: false });
    expect(title).toBeInTheDocument();
  });
  it('Se página mostra a imagem "https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif"', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/notExist');

    const imgPokedex = screen.getByRole('img', { name: /Pikachu crying/i });
    expect(imgPokedex).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
