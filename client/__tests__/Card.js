import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Card from '../src/components/Card.jsx';

describe('Card Component', () => {
 const mockGame = {
    platforms: ['Switch', 'Xbox', 'Playstation', 'PC'],
    genres: ['comedy', 'fps'],
    cover: 'assets-global.website-files.com/618d852d383de946ce0e3fa5/6495da7241185414c12ddc02_videoGamePlanet.PNG',
    name: 'Your Mom',
    summary: 'This is a game that exists to be played by thy mother??'
 };
 const mockOnLike = jest.fn();
 
 beforeEach(() => {
    render(<Card game={mockGame} onLike={mockOnLike} />);
 });

 it('renders the card cover', () => {
    expect(screen.getByAltText(mockGame.name)).toBeInTheDocument();
 });

 it('renders the card cover image', () => {
    const displayedImage = screen.getByAltText(mockGame.name);
    expect(displayedImage.getAttribute('src')).toEqual('https://assets-global.website-files.com/618d852d383de946ce0e3fa5/6495da7241185414c12ddc02_videoGamePlanet.PNG');
 });

 it('renders the game name', () => {
    expect(screen.getByText(mockGame.name)).toBeInTheDocument();
 });

 it('renders the card subhead', () => {
    expect(screen.getByText(`${mockGame.platforms.join(', ')} | ${mockGame.genres.join(', ')}`)).toBeInTheDocument();
 });

 it('renders the game summary', () => {
    expect(screen.getByText(mockGame.summary)).toBeInTheDocument();
 });

 it('should render the like button and call onLike on click', () => {
    fireEvent.click(screen.getByRole('button', { name: /like/i }));
    expect(mockOnLike).toHaveBeenCalled();
 });
});
