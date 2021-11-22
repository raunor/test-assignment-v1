import {expect, toJSON} from '@loopback/testlab';
import {CardRepository, DeckRepository} from '../../repositories';
import {
  givenCardInstance,
  givenDeckInstance,
  givenEmptyDatabase,
  testdb,
} from '../helpers';

describe('CardRepository', () => {
  let deckRepo: DeckRepository;
  let cardRepo: CardRepository;

  before(async () => {
    deckRepo = new DeckRepository(testdb);
    cardRepo = new CardRepository(testdb, async () => deckRepo);
  });

  beforeEach(givenEmptyDatabase);

  it('includes Card in findByDeckId method result', async () => {
    const deck = await givenDeckInstance(deckRepo);
    const card = await givenCardInstance(cardRepo, {deckId: deck.deckId});

    const response = await cardRepo.findByDeckId(deck.deckId, 1);

    expect(toJSON(response)).to.deepEqual([
      {
        ...toJSON(card),
      },
    ]);
  });

  it('includes Card in findAllByDeckId method result', async () => {
    const deck = await givenDeckInstance(deckRepo);
    const card = await givenCardInstance(cardRepo, {deckId: deck.deckId});

    const response = await cardRepo.findAllByDeckId(deck.deckId);

    expect(toJSON(response)).to.deepEqual([
      {
        ...toJSON(card),
      },
    ]);
  });
});
