import { Component } from '@angular/core';

import { ArchCardShufflerService } from './../../arch/services/arch-card-shuffler/arch.card-shuffler.service';

@Component({
  selector: 'test-card-shuffler',
  templateUrl: './test.card-shuffler.view.html',
})
export class TestCardShuffler  {
    /** El mazo */
    deck: string[];
    /** Indica si ha de invertir el mazo */
    inverse: boolean;
    /** Indica si ha de barajear */
    shuffle: boolean;
    /** Indica el mazo seleccionado */
    deckSelected: string;
    /** Lista de mazos posibles */
    LIST_OF_DECKS = [
        {CODE: 'Tarot', FULL: 'BARAJA DE TAROT'},
        {CODE: 'Spanish', FULL: 'BARAJA ESPAÑOLA'},
        {CODE: 'Poker', FULL: 'BARAJA DE POKER'},

    ]
  constructor (private cardShufflerService: ArchCardShufflerService)  {
        
  }

  shuffleDeck() {
      let func = 'generate' + this.deckSelected + 'Deck';
      this.deck = this.cardShufflerService[func](this.shuffle, this.inverse);
  }

}
