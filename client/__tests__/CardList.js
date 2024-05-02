import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CardList from '../src/components/CardList.jsx';
import Card from '../src/components/Card.jsx';

describe('CardList Component', () => {
 const mockGames = [
    { id: 1, name: 'Game 1', platforms: [], genres: [], cover: '', summary: '' },
    { id: 2, name: 'Game 2', platforms: [], genres: [], cover: '', summary: '' },
 ];
 const mockOnLike = jest.fn();
 const mockOnPreviousClick = jest.fn();
 const mockOnNextClick = jest.fn();

 beforeEach(() => {
    render(
      <CardList
        games={mockGames}
        onLike={mockOnLike}
        onPreviousClick={mockOnPreviousClick}
        onNextClick={mockOnNextClick}
        isPreviousDisabled={false}
        isNextDisabled={false}
      />
    );
 });

 it('renders the correct number of Card components', () => {
    expect(screen.getAllByTestId('card')).toHaveLength(mockGames.length);
 });

 it('calls onLike with the correct game name when a card is liked', () => {
    fireEvent.click(screen.getByText('Like')); // Assuming the like button has the text 'Like'
    expect(mockOnLike).toHaveBeenCalledWith(mockGames[0].name);
 });

 it('calls onPreviousClick when the previous button is clicked', () => {
    fireEvent.click(screen.getByRole('button', { name: /previous/i }));
    expect(mockOnPreviousClick).toHaveBeenCalled();
 });

 it('calls onNextClick when the next button is clicked', () => {
    fireEvent.click(screen.getByRole('button', { name: /next/i }));
    expect(mockOnNextClick).toHaveBeenCalled();
 });
});
