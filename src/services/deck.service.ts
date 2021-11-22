import {/* inject, */ BindingScope, injectable, service} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Deck} from '../models';
import {DeckDto} from '../models/deck-dto.model';
import {DeckRepository} from '../repositories';
import {CardService} from './card.service';

@injectable({scope: BindingScope.TRANSIENT})
export class DeckService {
  constructor(
    @repository(DeckRepository)
    public deckRepository: DeckRepository,
    @service(CardService)
    public cardService: CardService,
  ) {}

  async findById(id: number) {
    const deck = await this.deckRepository.findById(id);
    const cards = await this.cardService.findCards(id);
    return this.toDeckDto(deck, {cards: cards, remaining: cards.length});
  }

  async create(deckDto: DeckDto) {
    let deck = this.toDeck(deckDto);
    deck = await this.deckRepository.create(deck);
    const cards = await this.createCards(deck);
    return this.toDeckDto(deck, {remaining: cards.length});
  }

  private async createCards(deck: Deck) {
    return this.cardService.createCards(deck.deckId, deck.type, deck.shuffled);
  }

  private toDeck(deckDto: DeckDto) {
    return new Deck({
      shuffled: deckDto.shuffled,
      type: deckDto.type,
    });
  }

  private toDeckDto(deck: Deck, deckDto: Partial<DeckDto>) {
    const data = Object.assign(
      {
        deckId: deck.deckId,
        shuffled: deck.shuffled,
        type: deck.type,
      },
      deckDto,
    );
    return new DeckDto(data);
  }
}
