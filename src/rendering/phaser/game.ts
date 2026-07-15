import Phaser from 'phaser';
import { VillageScene } from './VillageScene';

export function createGame(parent: HTMLElement): Phaser.Game {
  return new Phaser.Game({
    type: Phaser.AUTO,
    parent,
    scene: [VillageScene],
    backgroundColor: '#6f9b52',
    scale: {
      mode: Phaser.Scale.RESIZE,
      // taille initiale explicite : sans elle, RESIZE démarre à 0×0 et ne se relance jamais
      width: '100%',
      height: '100%',
    },
    render: { antialias: true, roundPixels: false },
  });
}
