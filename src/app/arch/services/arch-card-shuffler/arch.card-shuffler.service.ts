import { Injectable } from '@angular/core';
import { ArchTracesService } from './../arch.traces.service';
import * as _ from 'lodash';

/** 
* Servicio para el tratamiento aleatorio de "barajas" de cartas (Arrays de String) 
* Tanto para generarlas como para mezclarlas como para obtener cartas en su versión normal o invertida.
*/
@Injectable()
export class ArchCardShufflerService {
  constructor (private tracesService: ArchTracesService) {}

  /**
   * Crea una "baraja" para que pueda ser barajeada, en caso de que se necesitase una.
   * @param cardsPerTree Cartas por palo
   * @param trees Array de palos
   * @param specialNames Nombres especiales para una carta en concreto del palo 
   * (Por ejemplo a la primera carta llamarla 'As' o a las tres ultimas 'Sota', 'Caballo'. 'Rey')
   * Los nombres deben corresponderse con su posición en el palo
   * @return La baraja, ordenada
   */
  generateDeck(cardsPerTree: number, trees?: string[], specialNames?: string[]): string[] {
    let retArr: string[] = [];
    trees = trees || [''];
    for (let t in trees) {
        for (let c = cardsPerTree - 1; c >= 0; c--) {
            let text = (specialNames[c])? specialNames[c] : (c + 1);
            text += (trees[t])? ` de ${trees[t]}` : '';
            retArr.push(text);
        }
    }
    return retArr;
  }

  /**
   * Genera una "baraja española"
   * @param shuffle Indica si ademas de generarla barajea la baraja
   */
  generateSpanishDeck(shuffle?: boolean){
    const CARDS_PER_TREE: number = 13;
    const TREES: string[] = ['Oros', 'Bastos', 'Copas', 'Espadas'];
    const SPECIAL_NAMES: string[] = ['As', null, null, null, null, null, null, null, null, null, 'Sota', 'Caballo', 'Rey'];
    let deck = this.generateDeck(CARDS_PER_TREE, TREES, SPECIAL_NAMES);
    return (shuffle)? this.shuffle(deck) : deck;
  }

  /** 
   * Genera una baraja de poker
   * @param shuffle Indica si ademas de generarla barajea la baraja
   */
  generatePokerDeck(shuffle?: boolean){
    const CARDS_PER_TREE: number = 13;
    const TREES: string[] = ['Picas', 'Diamantes', 'Corazones', 'Treboles'];
    const SPECIAL_NAMES: string[] = ['As', null, null, null, null, null, null, null, null, null, 'Sota', 'Reina', 'Rey'];
    let deck = this.generateDeck(CARDS_PER_TREE, TREES, SPECIAL_NAMES);
    return (shuffle)? this.shuffle(deck) : deck;
}

  /** 
   * Genera una baraja del Tarot
   * @param shuffle Indica si ademas de generarla barajea la baraja
   * @param inverse Indica si ademas de generarla invierte algunas cartas de la baraja
   * @return La baraja.
   */
  generateTarotDeck(shuffle?: boolean, inverse?: boolean) {
    const CARDS_PER_TREE: number = 22;
    const SPECIAL_NAMES: string[] = ['El Hierofante', 'La Sacerdotisa', 'La Emperatriz', 'El Emperador', 'El Sumo Sacerdote', 'Los Enamorados', 
    'El Carro', 'La Justicia', 'El Ermitaño', 'La Rueda de la Fortuna', 'La Fuerza', 'El Ahorcado', 'La Muerte', 
    'La Templanza', 'El Diablo', 'La Torre', 'La Estrella', 'La Luna', 'El Sol', 'El Juicio', 'El Mundo', 'El Loco'];
    let deck = this.generateDeck(CARDS_PER_TREE, null, SPECIAL_NAMES);
    deck = (shuffle) ? this.shuffle(deck) : deck;
    deck = (inverse) ? this.inverse(deck) : deck;
    return deck;
  }

  /** 
   * Invierte (o no) las cartas de una baraja (especialmente del Tarot)
   * @param deck Baraja a invertir
   * @return Baraja invertida 
   */
  inverse(deck: string[]) {
      for (let card in deck) {
          if (_.sample([true, false])) {
            deck[card] = deck[card] + ' invertid@';
          }
      }
      return deck;
  }

 
  /**
   * Barajea un mazo (o en realidad cualquier array) para obtener un texto.
   * @param deck La baraja a barajear.
   * @return La baraja barajeada
   */
  shuffle(deck?: string[]) {
    let j, x, i;
    for (i = deck.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = deck[i];
        deck[i] = deck[j];
        deck[j] = x;
    }
    return deck;
  }  
}
