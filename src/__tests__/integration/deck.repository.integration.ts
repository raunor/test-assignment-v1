import {expect, toJSON} from '@loopback/testlab';
import {DeckRepository} from '../../repositories';
import {givenDeckInstance, givenEmptyDatabase, testdb} from '../helpers';

describe('DeckRepository', () => {
  let deckRepo: DeckRepository;

  before(async () => {
    deckRepo = new DeckRepository(testdb);
  });

  beforeEach(givenEmptyDatabase);

  it('includes Deck in findById method result', async () => {
    const deck = await givenDeckInstance(deckRepo);

    const response = await deckRepo.findById(deck.deckId);

    expect(toJSON(response)).to.deepEqual({
      ...toJSON(deck),
    });
  });
});
