import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente About.js', () => {
  test('Testa se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getByRole('link', { name: 'About' }));
    const titlePokedex = screen.getByRole('heading', { level: 2, name: 'About Pokédex' });
    expect(titlePokedex).toBeInTheDocument();
  });
  test('Testa se a página contém 2 parágrafos', () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getByRole('link', { name: 'About' }));
    const p1Text = screen.getByText('This application', { exact: false });
    const p2Text = screen.getByText('One can filter', { exact: false });
    expect(p1Text).toBeInTheDocument();
    expect(p2Text).toBeInTheDocument();
  });
  test('Testa se a página contém a imagem', () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getByRole('link', { name: 'About' }));
    const img = screen.getByAltText('Pokédex');
    expect(img).toBeInTheDocument();
  });
});
