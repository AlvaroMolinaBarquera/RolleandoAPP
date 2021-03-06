export const enum GAME_SYSTEMS {
  ANIMA_BEYOND_FANTASY,
  WORLD_OF_DARKNESS,
  LEGEND_5_RINGS,
  HITOS,
};

export const LIST_OF_GAMES = [
  {CODE: GAME_SYSTEMS.ANIMA_BEYOND_FANTASY, FULL: 'Anima: Beyond Fantasy'},
  {CODE: GAME_SYSTEMS.WORLD_OF_DARKNESS, FULL: 'Mundo de Tinieblas'},
  {CODE: GAME_SYSTEMS.LEGEND_5_RINGS, FULL: 'La Leyenda de los 5 Anillos'},
  {CODE: GAME_SYSTEMS.HITOS, FULL: 'Hitos'},
];

export enum MODAL_BUTTON {
  ACCEPT,
  CLOSE,
  YES,
  NO
}

export enum MODAL_TYPE {
  ERROR,
  WARNING,  
  INFO,
  QUESTION,
}