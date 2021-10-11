import React from 'react';
import { render, screen } from '@testing-library/react';
import { NotFound } from '../components';

describe('AboutComponent', () => {
  test('Se página contém um heading h2 com o texto Page requested not found', () => {
    render(<NotFound />);

    const h2 = screen.getByRole('heading', { level: 2 });

    expect(h2).toBeInTheDocument();
    expect(h2).toHaveTextContent('Page requested not found 😭');

    const img = screen.getAllByRole('img');
    expect(img[1]).toHaveAttribute(
      'src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
    );
  });
});
