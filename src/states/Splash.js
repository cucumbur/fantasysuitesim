import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init () {}

  preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([this.loaderBg, this.loaderBar])

    this.load.setPreloadSprite(this.loaderBar)
    //
    // load your assets
    //
    this.load.image('mushroom', 'assets/images/mushroom2.png')

    // My Assets
    // Canary is for debug purposes (sort of... not really in use right now)
    this.load.image('canary', 'assets/images/canary.png')

    // UI assets
    this.load.spritesheet('portrait-info-box', 'assets/images/ui/portraitInfoBox_spritesheet.png', 128, 128)
    this.load.image('room-background', 'assets/images/ui/room-background.png')
    this.load.image('inventory-background', 'assets/images/ui/inventory-background.png')
    this.load.image('highlighted-tile', 'assets/images/ui/highlighted-tile.png')

    // Item Assets
    this.load.spritesheet('object_fountain', 'assets/images/roomObjects/fountain_spritesheet2.png', 64, 64)
    this.load.image('object_condoms', 'assets/images/roomObjects/condoms.png', 64, 64)
    this.load.image('object_emoji-poop', 'assets/images/roomObjects/emoji_poop.png', 64, 64)
    this.load.image('object_emoji-rose', 'assets/images/roomObjects/emoji_rose.png', 64, 64)
    this.load.image('object_emoji-champagne', 'assets/images/roomObjects/emoji_champagne.png', 64, 64)
  }

  create () {
    this.state.start('Info', true, false, true, 'Hello text test')
  }

}
