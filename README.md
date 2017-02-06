# Fantasy Suite Sim
A goofy, sex-positive game for [Strawberry Jam](https://itch.io/jam/strawberry-jam) inspired by the Bachelor/Bachelorette franchise. (They're better than you probably think)
made by me, Rick/cucumbur. contact me at cucucumbur@gmail.com by email. @cucumbur, or @rick_sheahan

## What is Fantasy Suite Sim?
In Fantasy Suite Sim, you play the role of a skeevy producer on a show called *The Achelor*. Your goal is to get as much lucrative footage of your willing contestants as you can, but you have to set up the environment in a way that fulfills both contestants desires for this to happen.

The gameplay is a cross between a puzzle game and a social sim game.

### What is Strawberry Jam?
[Strawberry Jam](https://itch.io/jam/strawberry-jam) is a cool jam hosted by a person and developer I admire, eevee. You should check it out and consider submitting

### What did I use to build this project?
My game is built in-browser with JavaScript, using [Phaser](http://phaser.io) as my game library. I used lean's [Phaser + ES6 + Webpack](https://github.com/lean/phaser-es6-webpack) scaffolding to build my game, since I have a love-hate relationship with JavaScript, and most of that love resides with ES6. My instructions for running my project are pulled directly from that. I also used a component made by trueicecold called [phaser-scrollable](https://github.com/trueicecold/phaser-scrollable), and along the way modified the internals and made it a ES6 module.

## Dev Stuff
### Running the game
1. ```git clone https://github.com/cucumbur/fantasysuitesim.git```
2. Install Node.js, npm
3. ```npm install``` in `fantasysuitesim`
4. ```npm run dev``` for dev work
5. ```npm run deploy``` for build

### Random dev thoughts
I'm struggling a lot with Phaser, although I think the developer makes a really great effort to make a usable API and design choices given the prototype nature of JS, although sometimes OO concepts that are shoehorned in or lack of clarity in public/private methods make it a big difficult. In the future, I might consider learning WebGL / Canvas directly and build an engine from scratch, use Haxe or LUA/LOVE, or consider Godot.

I'm about halfway through development. There is a BUNCH of random, ugly junk comments lying around and weird functionality. It's a jam game! Besides, I wanted to get it up on version control before my hard drive inevitably died. I really only have some UI stuff, but that should be the bulk of the game, to be honest. Initially I was trying to make sure it worked on my iPhone as well, but I stopped doing that a while ago. I may go back and make things work again after the main web build is finished.


## Credits
Thanks again to these codebases / people  
eevee  
Phaser  
lean  
trueicecold  
