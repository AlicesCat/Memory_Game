# Memory_Game

A game on a 4x3 board where a player has to find matching pairs of cards.

*All the code is written mostly in **JS** with the help of **HTML** & **CSS**.*

## Rules
A program creates a 4 x 3 board filled with 12 cards. At first, only the backs of the cards are shown. A player has to flip any two cards. If the cards have the same appearance, they are removed from the board. The player gets a +1 score. Otherwise, those cards are flipped back and the player has to start again. The game will ends when all pairs of cards with the same appearance are found. In this case, the player gets 6 scores. Finally, the program asks whether the player wants to play again. If the answer is yes, a new game will start.

## Credits

The game was created following [12HR+ YouTube Coding Bootcamp 2021!](https://youtu.be/Xm4BObh4MhI?t=34702) by [Code with Ania Kubów](https://www.youtube.com/channel/UC5DNytAJ6_FISueUfzZCVsw).

Check the original [Memory Game](https://github.com/kubowania/memory-game) on [Ania Kubow](https://github.com/kubowania)'s repository.

### My changes to the original

* **replayability** was added;
* the alert messages were replaced with **colored text** on the page:
  * *green* text for a *winning* message;
  * *blue* text for a *matching pair* message;
  * *red* text for a *multi clicking* message;
  * *black* text for a *try again* message; 
* the way how the **score** is calculated was changed;
* and many other small changes.
