import {belongsTo, Entity, model, property} from '@loopback/repository';
import {CardValue, Deck, DeckWithRelations, Suit} from '.';

@model({setting: {hiddenProperties: ['id', 'deckId']}})
export class Card extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id: number;

  @property({
    type: 'string',
    required: true,
  })
  value: CardValue;

  @property({
    type: 'string',
    required: true,
  })
  suit: Suit;

  // type: any due to DefaultCrudRepository.createBelongsToAccessorFor only accepting numeric ids
  @belongsTo(() => Deck)
  deckId: any; // eslint-disable-line

  constructor(data?: Partial<Card>) {
    super(data);
  }
}

export interface CardRelations {
  deck?: DeckWithRelations;
}

export type CardWithRelations = Card & CardRelations;
