import {Client, createRestAppClient, expect, toJSON} from '@loopback/testlab';
import {ProjectApplication} from '../..';
import {DeckType} from '../../models';
import {DeckDto} from '../../models/deck-dto.model';
import {CardRepository, DeckRepository} from '../../repositories';
import {
  givenCard,
  givenCardDto,
  givenDeck,
  givenDeckRepositories,
  givenRunningApplicationWithCustomConfiguration,
} from '../helpers';

describe('CardAcceptance', () => {
  let app: ProjectApplication;
  let client: Client;
  let deckRepo: DeckRepository;
  let cardRepo: CardRepository;

  before(async () => {
    app = await givenRunningApplicationWithCustomConfiguration();
  });

  after(() => app.stop());

  before(async () => {
    ({deckRepo, cardRepo} = await givenDeckRepositories(app));
  });
  before(() => {
    client = createRestAppClient(app);
  });

  beforeEach(async () => {
    await deckRepo.deleteAll();
    await cardRepo.deleteAll();
  });

  it('bad request error upon drawing a Card', async function () {
    const deck = await deckRepo.create(
      givenDeck({type: DeckType.SHORT, shuffled: true}),
    );
    await client.get(`/decks/${deck.deckId}/cards`).expect(400);
  });

  it('draw a Card', async function () {
    const deck = await deckRepo.create(
      givenDeck({type: DeckType.SHORT, shuffled: true}),
    );
    await cardRepo.create(givenCard({deckId: deck.deckId}));

    const initialDeckResponse = await client
      .get(`/decks/${deck.deckId}`)
      .expect(200);
    expect(new DeckDto(initialDeckResponse.body).cards.length).to.equal(1);

    const cardResponse = await client
      .get(`/decks/${deck.deckId}/cards`)
      .expect(200);
    const cardDto = givenCardDto();
    // comparing json because get values are not present when comparing objects
    expect(cardResponse.body).to.containDeep([toJSON(cardDto)]);

    const finalDeckResponse = await client
      .get(`/decks/${deck.deckId}`)
      .expect(200);
    expect(new DeckDto(finalDeckResponse.body).cards.length).to.equal(0);
  });
});
