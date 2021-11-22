import {expect} from '@loopback/testlab';
import {createCards} from '../../helpers/deck.helper';
import {DeckType} from '../../models';

describe('DeckHelper', () => {
  describe('createCards - FULL', () => {
    it('create 52 cards', async () => {
      const cards = createCards(DeckType.FULL, 1);
      expect(cards.length).to.eql(52);
    });
  });

  describe('createCards - SHORT', () => {
    it('create 36 cards ', async () => {
      const cards = createCards(DeckType.SHORT, 1);
      expect(cards.length).to.eql(36);
    });
  });
});
