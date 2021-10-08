import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

// function for test utils file
const renderWithRouter = (components) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{ components }</Router>),
    history,
  });
};

export default renderWithRouter;
