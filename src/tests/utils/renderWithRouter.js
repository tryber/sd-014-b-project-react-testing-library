import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

export default function renderWithRouter(component) {
  const customHistory = createMemoryHistory();
  const renderObject = render(
    <Router history= { customHistory }>
      { component }
    </Router>,
  );

  return {
    ...renderObject,
    history,
  };
}
