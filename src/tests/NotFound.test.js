import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Test component NotFound', () => {
  test('if the page contains a h2 with the text "Page requested not found"', () => {
    render(<NotFound />);
    const title = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    expect(title).toBeInTheDocument();
  });
  test('if the page shows the image', () => {
    render(<NotFound />);
    const image = screen.getByRole('img', {
      name: /Pikachu crying because/i,
    });
    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    expect(image)
      .toHaveAttribute('alt', 'Pikachu crying because the page requested was not found');
    expect(image).toBeInTheDocument();
  });
});
