// import React from 'react';
// import { screen, fireEvent } from '@testing-library/react';
// import renderWithRouter from './renderWithRouter';
// import App from '../App';
// import MutationObserver from '@sheerun/mutationobserver-shim';
// window.MutationObserver = MutationObserver;

// describe('Testado o componente FavoritePokemons', () => {
//   test(`Se não houver pokémons favoritos, deve aparecer
//   'No favorite pokemon found'`, () => {
//     renderWithRouter(<App />);
//     const pathname = screen.getByRole('link', { name: 'Favorite Pokémons' });

//     fireEvent.click(pathname);
//     const frase = screen.getByText('No favorite pokemon found');
//     expect(frase).toBeInTheDocument();
//   });
// });
