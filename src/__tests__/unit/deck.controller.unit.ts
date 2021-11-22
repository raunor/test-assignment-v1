import {
  createStubInstance,
  expect,
  sinon,
  StubbedInstanceWithSinonAccessor,
} from '@loopback/testlab';
import {DeckController} from '../../controllers';
import {DeckDto} from '../../models/deck-dto.model';
import {DeckService} from '../../services';
import {givenDeckDto} from '../helpers';

describe('DeckController', () => {
  let deckService: StubbedInstanceWithSinonAccessor<DeckService>;

  let controller: DeckController;
  let aDeckWithId: DeckDto;

  beforeEach(resetService);

  describe('createDeck', () => {
    it('creates a new Deck', async () => {
      const create = deckService.stubs.create;
      create.resolves(aDeckWithId);
      const result = await controller.create(aDeckWithId);
      expect(result).to.eql(aDeckWithId);
      sinon.assert.calledWith(create, aDeckWithId);
    });
  });

  describe('findDeckById', () => {
    it('returns a new Deck if it exists', async () => {
      const findById = deckService.stubs.findById;
      findById.resolves(aDeckWithId);
      expect(await controller.findById(aDeckWithId.deckId as number)).to.eql(
        aDeckWithId,
      );
      sinon.assert.calledWith(findById, aDeckWithId.deckId);
    });
  });

  function resetService() {
    deckService = createStubInstance(DeckService);
    aDeckWithId = givenDeckDto({
      deckId: 1,
    });

    controller = new DeckController(deckService);
  }
});
