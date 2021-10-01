import React from 'react';
import { cleanup, screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

afterEach(cleanup);

describe('renders not found page and tests it', () => {
  it('should contain a heading with an error message', () => {
    renderWithRouter(<NotFound />);
    const title = screen.getByRole('heading', {
      level: 2,
      name: 'Page requested not found Crying emoji',
    });
    expect(title).toBeInTheDocument();
  });
  it('should display an image', () => {
    const imageUrl = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    renderWithRouter(<NotFound />);
    const image = screen
      .getByAltText('Pikachu crying because the page requested was not found');
    expect(image).toBeInTheDocument();
    expect(image.src).toBe(imageUrl);
  });
});
