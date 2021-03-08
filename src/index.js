document.addEventListener('DOMContentLoaded', () => {
    
    // Card options
    const cards = [
        {
            name: 'cheeseburger',
            img: 'src/images/cheeseburger.png'
        },
        {
            name: 'cheeseburger',
            img: 'src/images/cheeseburger.png'
        },
        {
            name: 'fries',
            img: 'src/images/fries.png'
        },
        {
            name: 'fries',
            img: 'src/images/fries.png'
        },
        {
            name: 'hotdog',
            img: 'src/images/hotdog.png'
        },
        {
            name: 'hotdog',
            img: 'src/images/hotdog.png'
        },
        {
            name: 'ice-cream',
            img: 'src/images/ice-cream.png'
        },
        {
            name: 'ice-cream',
            img: 'src/images/ice-cream.png'
        },
        {
            name: 'milkshake',
            img: 'src/images/milkshake.png'
        },
        {
            name: 'milkshake',
            img: 'src/images/milkshake.png'
        },
        {
            name: 'pizza',
            img: 'src/images/pizza.png'
        },
        {
            name: 'pizza',
            img: 'src/images/pizza.png'
        }
    ]
    
    const blankCard = 'src/images/blank.png'  // A back of a card
    const whiteCard = 'src/images/white.png'  // No card

    // Cards will be displayed here
    const grid = document.querySelector('.grid')

    // Score will be displayed here
    const scoreDisplay = document.getElementById('result')

    // Messages will be displayed here
    const messageDisplay = document.getElementById('message')

    // All messages & their stylings
    // Win message
    const winMessage = 'You won!'
    const winMessageCSSClass = 'big-text'
    const winMessageColor = 'forestgreen'
    // Match message  // When a pair of chosen cards are similar
    const matchMessage = 'You have found a match!'
    const matchMessageColor = 'royalblue'
    // Mismatch message // When a pair of chosen cards are different
    const mismatchMessage = 'Try again!'
    const mismatchMessageColor = 'black'
    // Fail message // While clicking on the same image twice or more
    const failMessage = 'You have clicked the same image!'
    const failMessageColor = 'crimson' // red
    // Empty `default` message
    const defaultMessage = ''

    // `Confirm` message that will be shown after the game is finished
    const replayMessage = 'Do you want to play again?'

    // NodeList of all cards on the board will be stored here;
    // will be used to change an apperance of cards
    let cardsOnBoard = []

    // Names of cards (up to 2) that have been clicked will be stored here;
    // will be used to check for a similar card
    // IMPOTANT! Two cards with the same name are called `similar`
    //                                                      & NOT `the same`
    let cardChosenNames = []

    // Ids of cards (up to 2) that have been clicked will be stored here;
    // will be used to check for the same card
    // & to change properties for a specific card
    let cardChosenIds = []

    // Pairs of matching cards;
    // from 0 at the beginning up to 6 while a win
    let score = 0  

    function createBoard() {
        // Sorts `cards` list randomly, displays initial score & creates
        // `img` tags for every card from the `cards` list. An `img` tag will
        // have 2 attributes: `src` & `data-id`. `src` will be set to show
        // `blank.png` image instead of a card's initial image so every card
        // will be hidden; the card's initial image will be uncoverd while
        // clicking with the help of the `flipCard` function. `data-id`
        // attribute will be used later to identify a particular card.
        // All created `img`s will be added inside both the `div` with
        // the class `grid` into html document & `cardsOnBoard` variable
        cards.sort(() => 0.5 - Math.random())
        scoreDisplay.textContent = score
        for (let i = 0; i < cards.length; i++) {
            const card = document.createElement('img')
            card.setAttribute('src', blankCard)
            card.setAttribute('data-id', i)
            card.addEventListener('click', flipCard)
            grid.appendChild(card)
        }
        cardsOnBoard = document.querySelectorAll('img')
    }

    function flipCard() {
        // Assigns the `data-id` attribute of the clicked card to a `cardId`
        // variable. Checks if the card has been clicked again by checking if
        // the `cardId` is already stored in a `cardChosenIds` list & if so
        // display `failMessage` using red color. If not then pushes both
        // the card's id into the `cardChosenIds` & a card's name into
        // a `cardChosenNames` list; uncovers an actual image of the card &
        // checks if two images in a row was clicked & if so invokes
        // 'checkForMatch' function
        let cardId = this.getAttribute('data-id')
        if (cardChosenIds.includes(cardId)) {
            messageDisplay.style.color = failMessageColor
            messageDisplay.textContent = failMessage
        } else {
            cardChosenIds.push(cardId)
            cardChosenNames.push(cards[cardId].name)
            this.setAttribute('src', cards[cardId].img)
            if (cardChosenNames.length === 2) {
                checkForMatch()
            }
        }
    }

    function checkForMatch() {
        // If two cards that have been clicked are similar, changes their
        // appearance to white images & removes the ability to click on them.
        // Thus cards are visually removed from the board but the normal flow
        // of the board's grid remains. Also +1 to the score. If all cards 
        // have been found displays the `winMessage` & invokes replay function
        // after 500ms, & if not displays the `matchMessage`.
        // If two cards are different change their apperance to blank images
        // and displays the `mismatchMessage`. 
        // At the end empties the `cardChosenNames` & the `cardChosenIds`
        // in order to allow seaching for new matching pairs. 
        let firstCardId = cardChosenIds[0]
        let secondCardId = cardChosenIds[1]
        if (cardChosenNames[0] === cardChosenNames[1]) {
            setTimeout(() => {
                cardsOnBoard[firstCardId].setAttribute('src', whiteCard)
                cardsOnBoard[secondCardId].setAttribute('src', whiteCard)
            }, 500)
            cardsOnBoard[firstCardId].removeEventListener('click', flipCard)
            cardsOnBoard[secondCardId].removeEventListener('click', flipCard)
            score++
            scoreDisplay.textContent = score
            if (score === 6) {
                messageDisplay.style.color = winMessageColor
                messageDisplay.classList.add(winMessageCSSClass)
                messageDisplay.textContent = winMessage
                setTimeout(replay, 500) 
            } else {
                messageDisplay.style.color = matchMessageColor
                messageDisplay.textContent = matchMessage
            }
        } else {
            setTimeout(() => {
                cardsOnBoard[firstCardId].setAttribute('src', blankCard)
                cardsOnBoard[secondCardId].setAttribute('src', blankCard)
            }, 500)
            messageDisplay.style.color = mismatchMessageColor
            messageDisplay.textContent = mismatchMessage
        }
        cardChosenNames = []
        cardChosenIds = []
    }

    function replay() {
        // Asks if payer wants to play again & if so resets the
        // 'cardsOnBoard' & the 'score' to it's default values, removes any
        // text & a 'big-text' class from the 'messageDisplay' & creates
        // a new board. The 'cardChosenNames' & the 'cardChosenIds' will be
        // defaulted when the 'checkForMatch' function ends.
        if (confirm(replayMessage)) {
            for (let i = 0; i < cards.length; i++) {
                cardsOnBoard[i].remove()
            }
            messageDisplay.textContent = defaultMessage
            messageDisplay.classList.remove(winMessageCSSClass)
            cardsOnBoard = []
            score = 0
            createBoard()       
        }
        // document.location.reload()  // Reload the page
    }

    createBoard()
})