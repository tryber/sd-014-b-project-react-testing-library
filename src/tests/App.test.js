import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando o componente <App.js>', () => {
  test('Verifica se o primeiro link possui o texto "Home" ', () => {
    renderWithRouter(<App />);
    const firstLink = screen.getByRole('link', { name: 'Home' });
    expect(firstLink).toBeInTheDocument();
  });
  test('Verifica se o segundo link possui o texto "About" ', () => {
    renderWithRouter(<App />);
    const secundLink = screen.getByRole('link', { name: 'About' });
    expect(secundLink).toBeInTheDocument();
  });
  test('Verifica se o terceiro link possui o texto "Favorite Pokémons" ', () => {
    renderWithRouter(<App />);
    const thirdLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(thirdLink).toBeInTheDocument();
  });
});
