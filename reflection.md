# Major Project Reflection

## What Advice Would I Give Myself?
- Commit to making my own physics OR using p5play. I spent too much time trying to work on both at once for half of my work to be useless.

- Look into the p5play library and documentation sooner into the project. Looking at the functions rather than just relying on what the website says about them makes it way easier to understand.

- Organise my files better. At the end of this project I was left with around 10 sketch files that I used to test stuff that I don't really know what to do with.


## Did I Complete My "Needs to Have" List?
- My needs to have list included gravity and momentum that acts on the player; realistic-ish collisions; a moving player; a scene that the player can interact with and move inside; and sound affects and background music. I was able to implement all of these into my game.

- I was also able to include most of my nice to have list as well. I was not able to include physics created by me because that would have required me to redo my entire project. I ran out of time to add an enemy as well. Without something like an enemy to shoot, adding projectiles would be fairly useless so I focused on the rest of the nice to have list instead. Other than the three things mentioned above, I was able to complete my nice to have list.


## What Was The Hardest Part?
- The most difficult part of the project was trying to use p5play. Some of the functions in p5play aren’t explain well, or aren't explained at all. For example, p5play has property on all sprites called "autoCull." When set to true, the sprites will automatically delete themselves when far enough away from the camera. This created a huge problem where the platforms of the game would disappear while I was playing. Sprite cull is described once in p5play's website, and it is in the contexts of groups rather than sprites so it is difficult to find if you're not looking for it. Fortunately, I was able to find the property in the p5play documentation.

- Another issue I encountered was sprites overlapping. In p5play, groups are layered based on when they are drawn in the draw loop. Unfortunately, when drawing a group they will draw in order of when hey are created in the set up. This means that if I wanted to draw the level background, the lasers, the walls, and then the coins, I would have to created them in that order. I am unable to do this because the coordinates of the coins and lasers are based on the walls. I ended up having to break up the level one group into a few smaller groups so I was able to draw them in the right order.


## Was There Any Problems I couldn't Solve?
- The biggest problem I couldn't solve was collisions. In this game, the player can only move when it collides with anything in the solidsGroup array. Because p5play does not have any functions to detect if the player is only colliding with the top of the object, the player will be able to walk when touching the side of the platform as well. This leads to a glitch where the player can "stick" to the side of the platforms. This glitch also messes with the animation. When the player appears to be stuck to the side of the platform, it is actually bouncing off of the platform slightly a bunch of times. This will keep triggering the "collided" function, which triggers the jump animation to play.

- Another issue I encountered was randomly when playing the game, the lasers will all flash at the same time. When the game is reloaded, they will go back to working normally. I have tried numerous ways to prevent this from happening such as keeping track of their time separately from the start and end screens and having them always flash, but nothing solved the issue. Because they will do this at seemingly random times, I cant make a guess as to why this is happening.