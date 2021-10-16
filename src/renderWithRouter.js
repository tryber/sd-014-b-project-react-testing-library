/**
 * Consultei o repositório  tryber/sd-014-b-live-lectures da aula ao vivo para 
 * resolver o erro que estava dando ao realizar o teste no App, pois o Switch e Route
 * não podem funcionar se não forme filho do Router.
 * 
 * Link do repositório: https://github.com/tryber/sd-014-b-live-lectures/blob/lecture/15.3/portfolio_example/src/tests/renderWithRouter.js
 */

import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import App from './App';

const renderWithRouter = (component) => {
  const history = createBrowserHistory();
  history.push(component);
  return({
    ...render(<Router history={ history}><App /></Router>),
    history,
  });
};

export default renderWithRouter;
