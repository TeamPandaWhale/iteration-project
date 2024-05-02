import React from 'react';
import { Render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { Card } from '../src/components/Card';


describe('Card Component', () => {
  mockGame = {
    platforms: ['Switch', 'Xbox', 'Playstation', 'PC'],
    genres: ['comedy', 'fps'],
    cover: 'assets-global.website-files.com/618d852d383de946ce0e3fa5/6495da7241185414c12ddc02_videoGamePlanet.PNG',
    name: 'Your Mom',
    summary: 'This is a game that exists to be played by thy mother??'
  }
  mockOnLike = jest.fn();

  beforeEach(() => {
    render( <Card game={mockGame} onLike={mockOnLike}/> )
  });

  it('renders the card cover', () => {
    expect(screen.getByAltText(mockGame.name)).toBeInTheDocument();
  });

  it('renders the card cover image', () => {
    const displayedImage = document.querySelector('img');
    expect(displayedImage.getAttribute('src')).toEqual('https://assets-global.website-files.com/618d852d383de946ce0e3fa5/6495da7241185414c12ddc02_videoGamePlanet.PNG');
  });

  it('renders the game name', () => {
    expect(screen.getByText(mockGame.name)).toBeInTheDocument();
  });

  it('renders the card subhead', () => {
    expect(screen.getByText(mockGame.platforms.join(', ') | mockGame.genres.join(', ')));
  });

  it('renders the game summary', () => {
    expect(screen.getByText(mockGame.summary))
  });

  it('should render the like button', () => {
    fireEvent(screen.getByRole('button'))
    expect(mockOnLike.mock.calls).toHaveBeenCalled();
  })
})