import Phaser from 'phaser'
// import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init (isStartOfGame, infoText) {
    var style = { font: '28px Arial', fill: '#3A396C', boundsAlignH: 'center', boundsAlignV: 'middle', align: 'left', wordWrap: true, wordWrapWidth: 640 }
    if (isStartOfGame) {
      const introText = [
        'You are the producer on a TV show, The Achelor.',
        'The show is down to the last few contestants.',
        'The Achelor and one of the contestants, namehere, are staying in the Fantasy Suite tonight.',
        'They\'re both into each other, but they need the mood to be right to hook up.',
        'The more you get them in the mood, the more they\'ll do, and the budget you will have for next season.',
        'Using your starting budget of $5000 for Season 1, try to quickly place items in the room that',
        'fulfill the whims of both people.',
        'If you do well, you might get renewed.'
      ]

      introText.forEach((line, i) => {
        let banner = this.add.text(this.world.centerX, 100 * (i + 1), line, style)
        // banner.padding.set(10, 16)
        banner.anchor.setTo(0.5)
      })
    } else {
      const bannerText = infoText
      let banner = this.add.text(this.world.centerX, this.game.height - 80, bannerText)
      banner.font = 'Bangers'
      banner.padding.set(10, 16)
      banner.fontSize = 40
      banner.fill = '#77BFA3'
      banner.smoothed = false
      banner.anchor.setTo(0.5)
    }
  }

  preload () {
  }

  create () {
    setTimeout(() => (this.state.start('Game')), 1000)
  }

}
