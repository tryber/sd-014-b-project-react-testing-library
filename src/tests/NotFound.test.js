import React from 'react';
import { screen } from '@testing-library/react';
import myPersonalRender from './renderWithRouter';
import { NotFound } from '../components';

describe('A pagina "/notFound" exibe', () => {
  it('um titlo nivel 2 com o texto "Page requested not found 😭"', () => {
    myPersonalRender(<NotFound />);

    const notFound = screen.getByRole('heading', {
      level: 2,
      name: 'Page requested not found Crying emoji',
    });

    expect(notFound).toBeInTheDocument();
  });

  it('um gif do pikachu', () => {
    myPersonalRender(<NotFound />);

    const img = screen.getByAltText(
      'Pikachu crying because the page requested was not found',
    );

    expect(img).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });

  // linha 21, feita com base no codgo de Mariana Ferreira https://github.com/tryber/sd-014-b-project-react-testing-library/commit/4c2c0249ae0282d29a958d5b1a6cb16d163f71b5
});
