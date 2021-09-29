import { screen } from '@testing-library/react';
import React from 'react';

import { NotFound } from '../components';
import renderWithRouter from './renderWithRouter';

describe('Testing the component <NotFound />', () => {
  it('should have a heading <h2> with the text "Page requested not found 😭"', () => {
    renderWithRouter(<NotFound />);

    expect(screen.getByRole('heading', {
      level: 2,
      name: 'Page requested not found Crying emoji',
    })).toBeInTheDocument();
  });

  it('should have the image "https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif"', () => {
    renderWithRouter(<NotFound />);

    const notFoundImgURL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const notFoundImgAltText = 'Pikachu crying because the page requested was not found';

    expect(screen.getByAltText(notFoundImgAltText))
      .toHaveAttribute('src', notFoundImgURL);
  });
});
