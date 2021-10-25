import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from '../App';

test('se página contém um heading h2 com o texto Page requested not found', () => {
  const customHistory = createMemoryHistory();
  render(
    <Router history={ customHistory }>
      <App />
    </Router>,
  );

  customHistory.push('/f');

  const notFoundTitle = screen.getByRole('heading',
    { name: 'Page requested not found Crying emoji' });
  expect(notFoundTitle).toBeInTheDocument();

  const getImg = screen.getAllByRole('img');

  expect(getImg[1]).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
