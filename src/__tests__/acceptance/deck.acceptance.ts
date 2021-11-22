import {Client, createRestAppClient, expect} from '@loopback/testlab';
import {ProjectApplication} from '../..';
import {DeckType} from '../../models';
import {CardRepository, DeckRepository} from '../../repositories';
import {
  givenDeck,
  givenDeckDto,
  givenDeckRepositories,
  givenRunningApplicationWithCustomConfiguration,
} from '../helpers';

describe('DeckAcceptance', () => {
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

  it('create a short Deck', async function () {
    const deckDto = givenDeckDto({type: DeckType.SHORT});
    const response = await client.post('/decks').send(deckDto).expect(200);
    const responseDto = givenDeckDto({type: DeckType.SHORT, remaining: 36});
    expect(response.body).to.containDeep(responseDto);
  });

  it('create a full Deck', async function () {
    const deckDto = givenDeckDto();
    const response = await client.post('/decks').send(deckDto).expect(200);
    const responseDto = givenDeckDto({remaining: 52});
    expect(response.body).to.containDeep(responseDto);
  });

  it('create a shuffled Deck', async function () {
    const deckDto = givenDeckDto({shuffled: true});
    const response = await client.post('/decks').send(deckDto).expect(200);
    const responseDto = givenDeckDto({shuffled: true, remaining: 52});
    expect(response.body).to.containDeep(responseDto);
  });

  it('find a Deck', async function () {
    const deck = await deckRepo.create(
      givenDeck({type: DeckType.SHORT, shuffled: true}),
    );
    const response = await client.get(`/decks/${deck.deckId}`).expect(200);
    const deckDto = givenDeckDto({type: DeckType.SHORT, shuffled: true});
    expect(response.body).to.containDeep(deckDto);
  });
});
