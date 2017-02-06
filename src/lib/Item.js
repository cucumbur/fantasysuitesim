import Phaser from 'phaser'

// Item creates a sprite with the given x and y in the given game
// Then it adds the item to the object database, and the items database
// Then it adds it (initially) to the scrolling item window, scroller
class Item extends Phaser.Sprite {
  constructor ({ state, game, x, y, asset, name }) {
    super(game, x, y, asset)
    this.initialScrollX = x
    this.initialScrollY = y
    this.isPlaced = false

    state.objects[name] = this

    // Leave the automatic pushing to the items stack in the state out
    // Until it is shown that every single item always needs to be pushed to the queue
    // state.gameState.items.push(this)

    state.scroller.addChild(this)

    this.inputEnabled = true
    this.input.priorityID = 1

    this.events.onInputDown.add(function (e) {
      // When the item is already placed
      if (this.isPlaced) {
        // blank
      } else { // When the item is dragged from inventory
        this.x = state.scroller.x + this.initialScrollX
        this.y = state.scroller.y - 128 // no idea why I had to add 128 to this,
        // the bug is about parents/child and pixel ratios and came up after I added portraits at the top
        // this means thats scrollers y value is somehow lower than it should be?
        state.scroller.removeChild(this)
        state.scroller.stop()
        state.objects['roomBackground'].addChild(this)
      }
      this.alpha = 0.5
      state.gameState.isDraggingItem = true
      this.input.enableDrag(false, true, false, 255, state.dragWindow) // Weirdly, this has to be placed inside onInputDown
      this.input.enableSnap(64, 64, false, true)
      // fountainItem.events.onDragStop.add(() => scroller.start())
    }, this)
    this.events.onDragStart.add(() => {
      // console.log('ondragstart call')
      // state.gameState.isDraggingItem = true
    }
  )
    this.events.onDragStop.add(() => {
      let roomBackground = state.objects['roomBackground']
      let inventoryBackground = state.objects['inventoryBackground']

      // let rX = roomBackground.input.pointerX()
      // let rY = roomBackground.input.pointerY()
      // let iX = state.scroller.maskGraphics.input.pointerX()
      // let iY = state.scroller.maskGraphics.input.pointerY()
      // let x = this.game.input.x
      let y = this.game.input.y

      // The case where its dragged from inventory to inventory
      // Reset it back to its original position
      console.log('y: ', y, ' isplaced: ', this.isPlaced)
      console.log('inventoryBgs y: ', inventoryBackground.y)
      if ((inventoryBackground.y < y && y <= (inventoryBackground.y + inventoryBackground.height)) && !(this.isPlaced)) {
        console.log('inventory -> inventory drag')
        state.scroller.addChild(this)
        this.x = this.initialScrollX
        this.y = this.initialScrollY
      } else if ((y < inventoryBackground.y) && (y >= roomBackground.y) && !(this.isPlaced)) { // The case where its dragged from inventory to room
        console.log('inventory -> room drag')
        this.isPlaced = true
      } else if ((y < inventoryBackground.y) && (y >= roomBackground.y) && this.isPlaced) { // The case where its dragged from room to room
        console.log('room -> room drag')
      } else { // The case where it is dragged from the room back into the inventory
        console.log('room -> inventory drag')
        state.scroller.addChild(this)
        this.x = this.initialScrollX
        this.y = this.initialScrollY
        this.isPlaced = false
      }

      state.gameState.isDraggingItem = false
      this.alpha = 1.0
    })
  }

  // update () {
  // }

}

export default Item
