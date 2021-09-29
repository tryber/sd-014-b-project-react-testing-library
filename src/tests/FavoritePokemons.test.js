import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa se o componente Favoritos renderiza corretamente', () => {
  test('Verifica se a mensagem apropriada aparece, caso não tenha favoritos', () => {
    renderWithRouter(<App />);

    // Vai até a pagina favorite
    const getFavotires = screen.getByRole('link', { name: /Favorite/ });
    fireEvent.click(getFavotires);

    // Realiza os testes
    const searchMsg = screen.getByText(/No favorite pokemon found/i);
    expect(searchMsg).toBeInTheDocument();
  });

  test('Verifica os favoritos carregam, caso existam', () => {
    renderWithRouter(<App />);

    // Adiciona um Pokemon aos favoritos
    const getDetails = screen.getByRole('link', { name: /more details/i });
    fireEvent.click(getDetails);
    const getButton = screen.getByLabelText(/pokémon/i);
    fireEvent.click(getButton);

    // Checa se o Pokemon foi adicionado
    const getFavotires = screen.getByRole('link', { name: /Favorite/ });
    fireEvent.click(getFavotires);
    const searchMsg = screen.getByText(/Average weight/i);
    expect(searchMsg).toBeInTheDocument();
  });
});
