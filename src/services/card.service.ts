import {/* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {shuffle} from '../helpers/array.helper';
import {createCards} from '../helpers/deck.helper';
import {Card, DeckType} from '../models';
import {CardDto} from '../models/card-dto.model';
import {CardRepository} from '../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class CardService {
  constructor(
    @repository(CardRepository)
    public cardRepository: CardRepository,
  ) {}

  async createCards(deckId: number, deckType: DeckType, shuffled: boolean) {
    const cards = this.prepareCards(deckId, deckType, shuffled);
    return Promise.all(cards.map(card => this.cardRepository.create(card)));
  }

  async drawCards(deckId: number, count: number): Promise<CardDto[]> {
    const drawnCards = await this.cardRepository.findByDeckId(deckId, count);
    if (drawnCards.length < count) {
      throw new HttpErrors[400](
        `Deck contains ${drawnCards.length} cards, ${count} requested`,
      );
    }
    this.deleteCards(drawnCards);
    return drawnCards.map(card => this.toDto(card));
  }

  async findCards(deckId: number) {
    return (await this.cardRepository.findAllByDeckId(deckId)).map(card =>
      this.toDto(card),
    );
  }

  private prepareCards(deckId: number, deckType: DeckType, shuffled: boolean) {
    const cards = createCards(deckType, deckId);
    return shuffled ? shuffle(cards) : cards;
  }

  private deleteCards(cards: Card[]): void {
    cards.map(card => this.cardRepository.delete(card));
    return;
  }

  private toDto(card: Card) {
    return new CardDto({
      value: card.value,
      suit: card.suit,
    });
  }
}
