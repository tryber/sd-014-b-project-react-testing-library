import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import App from '../App';

describe('if Page not found works', () => {
  test('if page has an h2 with text and gif', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    history.push('/test');
    const headindText = screen.getByRole('heading', {
      level: 2,
      name: 'Page requested not found Crying emoji',
    });
    const notFoundGif = screen.getAllByRole('img')[1];
    expect(headindText).toBeInTheDocument();
    expect(notFoundGif).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
