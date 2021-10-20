import React from 'react';
import './not-found.css';

const NotFound = () => (
  <div className="not-found">
    <h2>
      {`Page requested ` + `not found`}
      <span role="img" aria-label="Crying emoji"> 😭</span>
    </h2>
    <img
      data-testid = "image-not-found"
      className="not-found-image"
      src={`https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif`}
      alt="Pikachu crying because the page requested was not found"
    />
  </div>
);

export default NotFound;
