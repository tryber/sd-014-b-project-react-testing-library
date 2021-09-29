import React from 'react';
import { screen } from '@testing-library/react';
import { NotFound } from '../components';
import renderWithRouter from './RenderWithRouter';

describe(('Requisito 4 -Testa o componente <NotFound />'), () => {
  it(('Testa se a heading h2 existe e mostra Page requested not found '), () => {
    renderWithRouter(<NotFound />);
    const whatISeek = screen.getByRole(
      'heading', {
        level: 2,
        name: 'Page requested not found Crying emoji',
      },
    );
    expect(whatISeek).toBeInTheDocument();
  });

  it(('Testa se a página mostra a imagem do Pikachu chorando'), () => {
    renderWithRouter(<NotFound />);
    // Tem vários img. Não posso procurar por getByRole
    // Possopegar pelo alt, então:
    const img = screen.getByAltText(/Pikachu/i);
    expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
