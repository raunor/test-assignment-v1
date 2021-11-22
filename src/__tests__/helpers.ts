import {juggler} from '@loopback/repository';
import {givenHttpServerConfig} from '@loopback/testlab';
import {ProjectApplication} from '../application';
import {Card, CardValue, Deck, DeckType, Suit} from '../models';
import {CardDto} from '../models/card-dto.model';
import {DeckDto} from '../models/deck-dto.model';
import {CardRepository, DeckRepository} from '../repositories';

export const testdb: juggler.DataSource = new juggler.DataSource({
  name: 'db',
  connector: 'memory',
});

export async function givenEmptyDatabase() {
  const deckRepo: DeckRepository = new DeckRepository(testdb);

  const cardRepo: CardRepository = new CardRepository(
    testdb,
    async () => deckRepo,
  );

  await deckRepo.deleteAll();
  await cardRepo.deleteAll();
}

export async function givenDeckRepositories(app: ProjectApplication) {
  const deckRepo = await app.getRepository(DeckRepository);
  const cardRepo = await app.getRepository(CardRepository);
  return {deckRepo, cardRepo};
}

export async function givenDeckInstance(
  deckRepo: DeckRepository,
  data?: Partial<Deck>,
) {
  return deckRepo.create(givenDeck(data));
}

export async function givenCardInstance(
  cardRepo: CardRepository,
  card?: Partial<Card>,
) {
  return cardRepo.create(givenCard(card));
}

export function givenDeck(deck?: Partial<Deck>) {
  const data = Object.assign(
    {
      type: DeckType.SHORT,
      shuffled: false,
    },
    deck,
  );
  return new Deck(data);
}

export function givenCard(card?: Partial<Card>) {
  const data = Object.assign(
    {
      value: CardValue.ACE,
      suit: Suit.CLUBS,
    },
    card,
  );
  return new Card(data);
}

export function givenDeckDto(todo?: Partial<DeckDto>) {
  const data = Object.assign(
    {
      shuffled: false,
      type: DeckType.FULL,
    },
    todo,
  );
  return new DeckDto(data);
}

export function givenCardDto(cardDto?: Partial<CardDto>) {
  const data = Object.assign(
    {
      value: CardValue.ACE,
      suit: Suit.CLUBS,
    },
    cardDto,
  );
  return new CardDto(data);
}

export async function givenRunningApplicationWithCustomConfiguration() {
  const app = new ProjectApplication({
    rest: givenHttpServerConfig(),
  });

  await app.boot();

  app.bind('datasources.config.db').to({
    name: 'db',
    connector: 'memory',
  });

  await app.start();
  return app;
}
