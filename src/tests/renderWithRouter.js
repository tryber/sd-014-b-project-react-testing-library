import React from 'react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

function renderWithRouter(component) {
  const customHistory = createMemoryHistory();
  return {
    ...render(
      <Router history={ customHistory }>
        { component }
      </Router>,
    ),
    history: customHistory,
  };
}

export default renderWithRouter;
