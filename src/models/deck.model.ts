import {Entity, model, property} from '@loopback/repository';
import {DeckType} from '.';

@model()
export class Deck extends Entity {
  @property({
    type: 'string',
    id: true,
    defaultFn: 'uuidv4',
  })
  deckId: number;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      enum: Object.values(DeckType),
    },
  })
  type: DeckType;

  @property({
    type: 'boolean',
    required: true,
  })
  shuffled: boolean;

  constructor(data?: Partial<Deck>) {
    super(data);
  }
}

export interface DeckRelations {}

export type DeckWithRelations = Deck & DeckRelations;
