import {
  createStubInstance,
  expect,
  sinon,
  StubbedInstanceWithSinonAccessor,
} from '@loopback/testlab';
import {CardController} from '../../controllers';
import {CardDto} from '../../models/card-dto.model';
import {CardService} from '../../services';
import {givenCardDto} from '../helpers';

describe('CardController', () => {
  let cardService: StubbedInstanceWithSinonAccessor<CardService>;

  let controller: CardController;
  let aCardDtoWithId: CardDto;
  let aListOfCardDtos: CardDto[];

  beforeEach(resetService);

  describe('findDeckById', () => {
    it('returns Cards if they exist', async () => {
      const drawCards = cardService.stubs.drawCards;
      drawCards.resolves(aListOfCardDtos);
      expect(await controller.findByDeckId(1, 1)).to.eql(aListOfCardDtos);
      sinon.assert.calledWith(drawCards, 1);
    });
  });

  function resetService() {
    cardService = createStubInstance(CardService);
    aListOfCardDtos = [aCardDtoWithId, givenCardDto()] as CardDto[];

    controller = new CardController(cardService);
  }
});
