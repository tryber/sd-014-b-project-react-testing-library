// src/renderWithRouter.js
// https://testing-library.com/docs/example-react-router/#reducing-boilerplate

import React from 'react';
import { Router } from 'react-router-dom';

// library that create navigation history
import { createMemoryHistory } from 'history';

import { render } from '@testing-library/react';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={history}>{component}</Router>), history,
  });
};

export default renderWithRouter;

// renderWithRouter only works if:
// < App > inside < BrowserRouter > in index.js