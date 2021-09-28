import React from 'react';
import { screen, fireEvent, render } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa se o navBar funciona devidamente', () => {
  test('Verifica o texto, e se o link Home funciona devidamente', () => {
    renderWithRouter(<App />);

    const getAbout = screen.getByText(/about/i);
    fireEvent.click(getAbout);

    const getHeading = screen.getByRole('heading', {
      level: 2,
      name: /About Pokédex/,
    });

    expect(getHeading).toBeInTheDocument();

    const getHeadings = screen.getAllByRole('heading');
    expect(getHeadings.length).toBe(3);
  });
});
