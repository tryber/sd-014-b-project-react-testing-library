import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import NotFound from '../components/NotFound';

describe('4. Teste o componente <NotFound.js />', () => {
  it('Teste se tem h2', () => {
    render(<Router><NotFound /></Router>);
    const h2 = screen.getByRole('heading', {
      name: /Page requested not found/i,
      level: 2,
    });
    expect(h2).toBeInTheDocument();
  });

  it('Teste se a página contém a imagem:', () => {
    render(<Router><NotFound /></Router>);
    const img = screen
      .getByAltText(/Pikachu crying because the page requested was not found/i);
    const imgUrl = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(img).toBeInTheDocument();
    expect(img.src).toContain(imgUrl);
  });
});
