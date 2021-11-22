import {service} from '@loopback/core';
import {
  get,
  getModelSchemaRef,
  param,
  post,
  requestBody,
  response,
} from '@loopback/rest';
import {DeckDto} from '../models/deck-dto.model';
import {DeckService} from '../services';

export class DeckController {
  constructor(
    @service(DeckService)
    public deckService: DeckService,
  ) {}

  @post('/decks')
  @response(200, {
    description: 'New Deck',
    content: {
      'application/json': {
        schema: getModelSchemaRef(DeckDto, {
          exclude: ['cards'],
        }),
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DeckDto, {
            title: 'NewDeckRequestDto',
            exclude: ['deckId', 'cards', 'remaining'],
          }),
        },
      },
    })
    deck: DeckDto,
  ): Promise<DeckDto> {
    return this.deckService.create(deck);
  }

  @get('/decks/{id}')
  @response(200, {
    description: 'Retrieve Deck',
    content: {
      'application/json': {
        schema: getModelSchemaRef(DeckDto, {includeRelations: true}),
      },
    },
  })
  async findById(@param.path.string('id') id: number): Promise<DeckDto> {
    return this.deckService.findById(id);
  }
}
