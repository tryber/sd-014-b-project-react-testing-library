import React from 'react';
import './not-found.css';

const NotFound = () => (
  <div data-testid="not-found-page" className="not-found">
    <h2 data-testid="not-found-text">
      {`Page requested ` + `not found`}
      <span role="img" aria-label="Crying emoji"> 😭</span>
    </h2>
    <img
      className="not-found-image"
      src={`https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif`}
      alt="Pikachu crying because the page requested was not found"
      data-testid="not-found-image"
    />
  </div>
);

export default NotFound;
