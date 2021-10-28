import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import App from '../App';

describe('the application has a navbar with links', () => {
  test('if has a link to Home', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const homeLink = screen.getByText('Home');
    expect(homeLink).toBeInTheDocument();
  });
  test('if has a link to About', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const aboutLink = screen.getByText('About');
    expect(aboutLink).toBeInTheDocument();
  });
  test('if has a link to Favorite Pokémons', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const favoriteLink = screen.getByText('Favorite Pokémons');
    expect(favoriteLink).toBeInTheDocument();
  });
});
