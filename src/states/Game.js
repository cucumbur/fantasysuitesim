/* globals __DEV__ */
import Phaser from 'phaser'
import Item from '../lib/Item'
import ScrollableArea from '../external/phaser-scrollable'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    // My Stuff
    this.objects = {}
    this.gameState = {}
    let gameState = this.gameState
    gameState.items = []
    gameState.itemsToSlide = []
    gameState.isDraggingItem = false

    let gameInterfaceGroup = this.game.add.group()

    // Add canary sprite for debug purposes
    let canary = this.add.sprite(this.game.width - 100, 0, 'canary')
    canary.inputEnabled = true
    this.objects['canary'] = canary
    canary.visible = false

    // Character Portrait boxes setup
    let portraitInfoBox0 = this.add.sprite(0, 0, 'portrait-info-box')
    portraitInfoBox0.animations.add('animate', [0, 1], 3, true)
    portraitInfoBox0.animations.play('animate')
    gameInterfaceGroup.add(portraitInfoBox0)
    let portraitInfoBox1 = this.add.sprite(portraitInfoBox0.width, 0, 'portrait-info-box')
    portraitInfoBox1.animations.add('animate', [0, 1], 3, true)
    portraitInfoBox1.animations.play('animate')
    gameInterfaceGroup.add(portraitInfoBox1)

    // Room setup
    let roomBackground = this.add.sprite(0, portraitInfoBox0.y + portraitInfoBox0.height, 'room-background')
    roomBackground.inputEnabled = true
    this.objects['roomBackground'] = roomBackground
    gameInterfaceGroup.add(roomBackground)

    // Highlighted Tile setup
    let highlightedTile = this.add.sprite(0, 0, 'highlighted-tile')
    highlightedTile.visible = false
    this.objects['highlightedTile'] = highlightedTile
    // highlightedTile.inputEnabled = true
    gameInterfaceGroup.add(highlightedTile)

    // Inventory box setup
    // New sprite based inventory box
    let inventoryBackground = this.add.sprite(0, roomBackground.y + roomBackground.height, 'inventory-background')
    inventoryBackground.inputEnabled = true
    this.objects['inventoryBackground'] = inventoryBackground
    gameInterfaceGroup.add(inventoryBackground)
    this.dragWindow = new Phaser.Rectangle(0, 0, 640, 768) // experimantal. move to beginning if brogen and change y from roomBackground.x to 0

    // Scrollable
    this.scroller = this.game.add.existing(new ScrollableArea(0, roomBackground.y + roomBackground.height, 640, 128, { verticalScroll: false, verticalWheel: false }))
    var textStyle = { font: '30px Arial', fill: '#3A396C' }
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 6; j++) {
        var text = this.game.make.text(i * 330, j * 30, '*Fantasy Suite Sim*', textStyle)
        this.scroller.addChild(text)
      }
    }
    this.scroller.start()
    gameInterfaceGroup.add(this.scroller)

    // Inventory box items setup
    // let itemsGroup = this.game.add.group()
    let calcItemInitialScrollX = () => gameState.items.length * 64
    let fountainItem = new Item({
      state: this,
      game: this.game,
      x: calcItemInitialScrollX(),
      y: 0,
      asset: 'object_fountain',
      name: 'fountainItem'
    })
    fountainItem.animations.add('animate', [0, 1, 2], 4, true)
    fountainItem.animations.play('animate')
    gameState.items.push(fountainItem)
    // gameInterfaceGroup.add(fountainItem)
    // fountainItem.input.enableDrag()
    // fountainItem.input.enableSnap(64, 64, true, true)
    // fountainItem.events.onInputDown.add(function (e) {
    //       // Processing of pressing should be carried out delayed
    //   if (typeof e.timerInputDown !== 'undefined') clearTimeout(e.timerInputDown)
    //   e.timerInputDown = window.setTimeout(function (e) {
    //     // Checks scroll
    //     if (!this.game.scroller.dragging) this.game.add.tween(e).to({ alpha: 0.3 }, 300, Phaser.Easing.Linear.None, true)
    //   }, 1000, e)
    // }, this)
    gameState.items.push(new Item({
      state: this,
      game: this.game,
      x: calcItemInitialScrollX(),
      y: 0,
      asset: 'object_condoms',
      name: 'condomsItem'
    }))
    gameState.items.push(new Item({
      state: this,
      game: this.game,
      x: calcItemInitialScrollX(),
      y: 0,
      asset: 'object_emoji-champagne',
      name: 'champagneItem'
    }))
    gameState.items.push(new Item({
      state: this,
      game: this.game,
      x: calcItemInitialScrollX(),
      y: 0,
      asset: 'object_emoji-poop',
      name: 'poopItem'
    }))
    gameState.items.push(new Item({
      state: this,
      game: this.game,
      x: calcItemInitialScrollX(),
      y: 0,
      asset: 'object_emoji-rose',
      name: 'roseItem'
    }))

    let scroller = this.scroller
    scroller.inputEnabled = true

    gameInterfaceGroup.sendToBack(scroller)
    gameInterfaceGroup.sendToBack(inventoryBackground)
    // gameInterfaceGroup.sendToBack(roomBackground)

    scroller.maskGraphics.events.onInputOver.add(function (e) {
      // alert('over the inventory background')
      scroller.start()
    })
  }

  // update () {
  // }

  render () {
    if (__DEV__) {
      // this.game.debug.text('scroller.dragging: ' + this.scroller.dragging, 5, 10)
      // this.game.debug.text('scroller.pressedDown: ' + this.scroller.dragging, 5, 25)
      // let item = this.objects['fountainItem']
      // if (item.input.pointerOver(0) || (item.input.pointerOver(1)) && item.input.pointerDown(1)) {
      //   this.objects['canary'].visible = true
      // } else {
      //   this.objects['canary'].visible = false
      // }
    }

    // "Highlighted Tile" hover code
    let roomBackground = this.objects['roomBackground']
    if (roomBackground.input.pointerOver(0) || (roomBackground.input.pointerOver(1)) && roomBackground.input.pointerDown(1)) {
      let [roomX, roomY] = [roomBackground.x, roomBackground.y]
      let [mouseX, mouseY] = [this.game.input.activePointer.x, this.game.input.activePointer.y]
      let relativeX = mouseX - roomX
      let relativeY = mouseY - roomY
      let selectedX = relativeX - (relativeX % 64) + roomX
      let selectedY = relativeY - (relativeY % 64) + roomY
      this.objects['highlightedTile'].x = selectedX
      this.objects['highlightedTile'].y = selectedY
      this.objects['highlightedTile'].visible = true
    } else {
      this.objects['highlightedTile'].visible = false
    }

    // Old rounded rectangle primitive used for image box
    // Abandoned for performance reasons + it draws over the scrollable area
    // let inventoryBox = this.game.add.graphics(0, 640)
    // inventoryBox.beginFill(0xFAD2DD)
    // inventoryBox.drawRoundedRect(0, 0, 640, 128, 20)
    // inventoryBox.endFill()
  }
}
