import {model, property} from '@loopback/repository';
import {Model} from '@loopback/repository-json-schema';
import {DeckType} from '.';
import {CardDto} from './card-dto.model';

@model()
export class DeckDto extends Model {
  @property({
    type: 'string',
    id: true,
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

  @property({
    type: 'array',
    required: false,
    itemType: 'object',
  })
  cards: CardDto[];

  @property({
    type: 'number',
    required: true,
  })
  remaining: number;

  constructor(data?: Partial<DeckDto>) {
    super(data);
  }
}
