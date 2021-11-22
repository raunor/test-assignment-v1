import {Getter, inject} from '@loopback/core';
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  repository,
} from '@loopback/repository';
import {DeckRepository} from '.';
import {DbDataSource} from '../datasources';
import {Card, CardRelations, Deck} from '../models';

export class CardRepository extends DefaultCrudRepository<
  Card,
  typeof Card.prototype.id,
  CardRelations
> {
  public readonly deck: BelongsToAccessor<Deck, typeof Deck.prototype.deckId>;
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('DeckRepository')
    protected deckRepositoryGetter: Getter<DeckRepository>,
  ) {
    super(Card, dataSource);
    this.deck = this.createBelongsToAccessorFor('deck', deckRepositoryGetter);

    this.registerInclusionResolver('deck', this.deck.inclusionResolver);
  }

  public findByDeckId(deckId: number, count: number) {
    return this.find({where: {deckId}, limit: count});
  }

  public findAllByDeckId(deckId: number) {
    return this.find({where: {deckId}});
  }
}
