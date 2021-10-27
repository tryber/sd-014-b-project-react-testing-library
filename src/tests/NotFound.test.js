import React from 'react';
import { screen } from '@testing-library/react';
import { NotFound } from '../components';
import renderWithRouter from '../renderWithRouter';

describe('Tests the NotFound.js application', () => {
  test('page has a level 2 heading with the text `Page requested not found`', () => {
    renderWithRouter(<NotFound />);
    const heading = screen.getByRole('heading', {
      level: 2, name: 'Page requested not found Crying emoji',
    });
    expect(heading).toBeInTheDocument();
  });
  test('page has image', () => {
    renderWithRouter(<NotFound />);
    const image = screen.getByAltText(
      'Pikachu crying because the page requested was not found',
    );
    expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
