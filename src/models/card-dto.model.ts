import {Model, model, property} from '@loopback/repository';
import {CardValue, Suit} from '.';

@model()
export class CardDto extends Model {
  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      enum: Object.values(CardValue),
    },
  })
  value: CardValue;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      enum: Object.values(Suit),
    },
  })
  suit: Suit;

  @property({
    type: 'string',
    description: 'Short combination of value and suit - 10H, QS, KH ...',
  })
  public get code() {
    return `${this.value.length > 2 ? this.value[0] : this.value}${
      this.suit[0]
    }`;
  }

  constructor(data?: Partial<CardDto>) {
    super(data);
  }
}

export interface CardRelations {}

export type CardWithRelations = CardDto & CardRelations;
