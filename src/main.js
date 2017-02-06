import 'pixi'
import 'p2'
import Phaser from 'phaser'

import BootState from './states/Boot'
import SplashState from './states/Splash'
import InfoState from './states/Info'
import GameState from './states/Game'

import config from './config'

class Game extends Phaser.Game {

  constructor () {
    // const docElement = document.documentElement
    // const width = docElement.clientWidth > config.gameWidth ? config.gameWidth : docElement.clientWidth
    // const height = docElement.clientHeight > config.gameHeight ? config.gameHeight : docElement.clientHeight
    // const width = window.innerWidth > config.gameWidth ? config.gameWidth : window.innerWidth
    // const height = window.innerHeight > config.gameHeight ? config.gameHeight : window.innerHeight
    const width = config.gameWidth
    const height = config.gameHeight


    super(width, height, Phaser.AUTO, 'content', null)

    this.state.add('Boot', BootState, false)
    this.state.add('Splash', SplashState, false)
    this.state.add('Info', InfoState, false)
    this.state.add('Game', GameState, false)

    this.state.start('Boot')
  }
}

window.game = new Game()
