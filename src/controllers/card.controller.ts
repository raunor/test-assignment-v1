import {service} from '@loopback/core';
import {get, getModelSchemaRef, param, response} from '@loopback/rest';
import {CardDto} from '../models/card-dto.model';
import {CardService} from '../services';

export class CardController {
  constructor(
    @service(CardService)
    public cardService: CardService,
  ) {}

  @get('decks/{deckId}/cards')
  @response(200, {
    description: 'Draw Card(s)',
    content: {
      'application/json': {
        schema: getModelSchemaRef(CardDto),
      },
    },
  })
  async findByDeckId(
    @param.path.string('deckId') deckId: number,
    @param.query.number('count') count = 1,
  ): Promise<CardDto[]> {
    return this.cardService.drawCards(deckId, count);
  }
}
