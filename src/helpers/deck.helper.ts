import {Card, CardValue, DeckType, Suit} from '../models';

export const createCards = (deckType: DeckType, deckId: number): Card[] => {
  return Object.values(Suit).flatMap(suit =>
    Object.values(CardValue)
      .slice(deckType === DeckType.SHORT ? 4 : 0)
      .map(
        cardValue =>
          new Card({
            value: cardValue,
            suit: suit,
            deckId: deckId,
          }),
      ),
  );
};
