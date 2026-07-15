import Phaser from 'phaser';
import type { Villager } from '../../domain/types';
import { PAL } from '../palette';

/**
 * Représentation Phaser d'un habitant. Lit l'état de la simulation, ne le
 * modifie jamais. Silhouette ~26 px : ombre, tunique, tête, coiffure, chapeau.
 */
export class VillagerView {
  readonly container: Phaser.GameObjects.Container;
  private ring: Phaser.GameObjects.Graphics;
  private accessoryText: Phaser.GameObjects.Text | null = null;
  private nameTag: Phaser.GameObjects.Text;
  private bob = Math.random() * Math.PI * 2;
  private facing = 1;

  constructor(scene: Phaser.Scene, public readonly villager: Villager) {
    this.container = scene.add.container(villager.pos.x, villager.pos.y);

    this.ring = scene.add.graphics();
    this.ring.lineStyle(2.5, 0xfff3c8, 0.95);
    this.ring.strokeEllipse(0, 1, 22, 10);
    this.ring.setVisible(false);
    this.container.add(this.ring);

    const g = scene.add.graphics();
    const L = villager.look;

    // ombre
    g.fillStyle(PAL.shadow, 0.2);
    g.fillEllipse(0, 1, 15, 6);
    // jambes
    g.fillStyle(0x4a3a2e, 1);
    g.fillRoundedRect(-4.5, -7, 4, 8, 2);
    g.fillRoundedRect(0.5, -7, 4, 8, 2);
    // tunique
    g.fillStyle(L.outfit, 1);
    g.fillRoundedRect(-6, -19, 12, 14, 4);
    g.fillStyle(L.outfitAccent, 1);
    g.fillRoundedRect(-6, -10, 12, 3.5, 2);
    // tête
    g.fillStyle(L.skin, 1);
    g.fillCircle(0, -24, 6);
    // yeux
    g.fillStyle(0x33241c, 1);
    g.fillCircle(-2, -24.5, 0.9);
    g.fillCircle(2, -24.5, 0.9);
    // coiffure
    g.fillStyle(L.hair, 1);
    switch (L.hairStyle) {
      case 'short':
        g.fillCircle(0, -27, 5.4);
        g.fillRect(-5.4, -28, 10.8, 3);
        break;
      case 'long':
        g.fillCircle(0, -27, 5.6);
        g.fillRoundedRect(-6.4, -27, 3.4, 10, 2);
        g.fillRoundedRect(3, -27, 3.4, 10, 2);
        break;
      case 'bun':
        g.fillCircle(0, -27, 5.4);
        g.fillCircle(0, -32, 3);
        break;
      case 'bald':
        g.fillCircle(-4, -26.5, 2.2);
        g.fillCircle(4, -26.5, 2.2);
        break;
      case 'cap':
        break;
    }
    // chapeau
    switch (L.hat) {
      case 'straw':
        g.fillStyle(0xe0c479, 1);
        g.fillEllipse(0, -28, 16, 5);
        g.fillCircle(0, -30, 4.5);
        break;
      case 'cap':
        g.fillStyle(L.outfitAccent, 1);
        g.fillCircle(0, -28.5, 5);
        g.fillRoundedRect(-6.5, -28.5, 8, 3, 1.5);
        break;
      case 'hood':
        g.fillStyle(L.outfit, 1);
        g.fillCircle(0, -27, 6);
        break;
      case 'flower':
        g.fillStyle(PAL.flower1, 1);
        g.fillCircle(4, -29.5, 2.2);
        g.fillStyle(PAL.flower2, 1);
        g.fillCircle(4, -29.5, 1);
        break;
    }
    this.container.add(g);
    this.body = g;

    this.nameTag = scene.add
      .text(0, -40, villager.name, {
        fontFamily: 'system-ui, sans-serif',
        fontSize: '10px',
        color: '#fdf6e3',
        stroke: '#5b4632',
        strokeThickness: 3,
      })
      .setOrigin(0.5, 1)
      .setResolution(2)
      .setVisible(false);
    this.container.add(this.nameTag);

    // zone cliquable
    this.container.setSize(26, 40);
    this.container.setInteractive(
      new Phaser.Geom.Rectangle(-13, -36, 26, 40),
      Phaser.Geom.Rectangle.Contains,
    );
  }

  private body: Phaser.GameObjects.Graphics;

  setAccessory(scene: Phaser.Scene, glyph: string | null): void {
    if (glyph === null) {
      this.accessoryText?.destroy();
      this.accessoryText = null;
      return;
    }
    if (this.accessoryText?.text === glyph) return;
    this.accessoryText?.destroy();
    this.accessoryText = scene.add
      .text(8, -14, glyph, { fontSize: '10px' })
      .setOrigin(0.5)
      .setResolution(2);
    this.container.add(this.accessoryText);
  }

  update(dtMs: number, selected: boolean, showName: boolean): void {
    const v = this.villager;
    this.container.setVisible(!v.asleep);
    this.container.setPosition(v.pos.x, v.pos.y);
    this.container.setDepth(v.pos.y);
    this.ring.setVisible(selected);
    this.nameTag.setVisible(showName);

    // orientation
    if (v.target) this.facing = v.target.x >= v.pos.x ? 1 : -1;
    this.body.setScale(this.facing, 1);

    // animation : marche = rebond, activité = respiration
    this.bob += dtMs * 0.001 * (v.target ? 10 : 2.4);
    if (v.target) {
      this.body.y = -Math.abs(Math.sin(this.bob)) * 2.4;
      this.body.rotation = Math.sin(this.bob) * 0.05;
    } else {
      this.body.y = Math.sin(this.bob) * 0.7;
      this.body.rotation = 0;
      if (v.activity === 'work') this.body.rotation = Math.sin(this.bob * 2.2) * 0.06;
    }
    if (this.accessoryText) this.accessoryText.setScale(this.facing, 1).setX(8 * this.facing);
  }
}
