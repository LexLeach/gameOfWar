class Players {
    constructor(name) {
        this.name = name
    }
}

class Card {
    constructor(suit, rank, score) {
        this.suit = suit;
        this.rank = rank;
        this.score = score;
    }
}

class Deck {
    constructor() {
        this.deck = []
        this.shuffledCards = []
        this.players = []
        this.player1Deck = []
        this.player2Deck = []
        this.chest = []
        this.cards = {
            suits: ['Clubs', 'Diamonds', 'Hearts', 'Spades'],
            ranks: [
                { label: 'Ace', score: 1 },
                { label: '2', score: 2 },
                { label: '3', score: 3 },
                { label: '4', score: 4 },
                { label: '5', score: 5 },
                { label: '6', score: 6 },
                { label: '7', score: 7 },
                { label: '8', score: 8 },
                { label: '9', score: 9 },
                { label: '10', score: 10 },
                { label: 'Jack', score: 11 },
                { label: 'Queen', score: 12 },
                { label: 'King', score: 13 }
            ]
        }
    }

    addPlayer(name) {
        if (this.players.length === 2) {
            return 'Players is full!'
        }
        this.players.push(name)
    }

    createDeck() {
        const suits = this.cards.suits
        const ranks = this.cards.ranks
        for (let suit of suits) {
            for (let rank of ranks) {
                this.deck.push(new Card(suit, rank.label, rank.score));
            }
        }
        //console.log(this.deck)
    }

    shuffle() {
        let num, num2, num3;
        for (let i = 0; i < 1000; i++) {
            num = Math.floor((Math.random() * this.deck.length));
            num2 = Math.floor((Math.random() * this.deck.length));
            num3 = this.deck[num];
            this.shuffledCards[num] = this.shuffledCards[num2];
            this.shuffledCards[num2] = num3;
        }
        this.player1Deck = this.shuffledCards.splice(0, 26)
        this.player2Deck = this.shuffledCards.splice(0, 26)
    }

    draw() {
        const player1Draw = this.player1Deck.shift()
        //console.log(player1Draw)
        const player2Draw = this.player2Deck.shift()
        //console.log(player2Draw)
        return this.vs(player1Draw, player2Draw)
    }

    vs(player1Draw, player2Draw) {
        if (this.player1Deck.length === 0 || this.player2Deck.length === 0) {
            return `${this.players[1].name} wins the game!`
        }
        if (player1Draw.score < player2Draw.score) {
            this.player2Deck.push(player1Draw)
            this.player2Deck.push(player2Draw)
            console.log('Player 2 gets the cards')
            console.log(`${this.players[1].name} has ${this.player2Deck.length} cards.`)
            console.log(`${this.players[0].name} has ${this.player1Deck.length} cards.`)
            return
        }
        if (player2Draw.score < player1Draw.score) {
            this.player1Deck.push(player2Draw)
            this.player1Deck.push(player1Draw)
            console.log('Player 1 gets the cards')
            console.log(`${this.players[0].name} has ${this.player1Deck.length} cards.`)
            console.log(`${this.players[1].name} has ${this.player2Deck.length} cards.`)
            return
        }
        //return this.war()         
    }

    war() {
        const player1Draw2 = this.player1Deck.splice(0, 2)
        const player2Draw2 = this.player2Deck.splice(0, 2)
        const chest = []
        if (player1Draw2[0].score < player2Draw2[0].score) {
            console.log('Player 2 wins the War!')
            this.player2Deck.push(player1Draw2)
            this.player2Deck.push(player2Draw2)
            this.player2Deck.push(chest)
            this.chest = []
            console.log(`${this.players[0].name} has ${this.player1Deck.length} cards.`)
            console.log(`${this.players[1].name} has ${this.player2Deck.length} cards.`)
            return
        }
        if (player1Draw2[0].score > player2Draw2[0].score) {
            console.log('Player 1 wins the War!')
            this.player1Deck.push(player1Draw2)
            this.player1Deck.push(player2Draw2)
            this.player1Deck.push(chest)
            this.chest = []
            console.log(`${this.players[0].name} has ${this.player1Deck.length} cards.`)
            console.log(`${this.players[1].name} has ${this.player2Deck.length} cards.`)
            return
        }
        console.log('Its a tie! Draw again!')
        this.chest.push(player1Draw2)
        this.chest.push(player2Draw2)
        return this.war()
    }
}

const newDeck = new Deck();
const lex = new Players('Lex')
newDeck.addPlayer(lex)
const mo = new Players('Mo')
newDeck.addPlayer(mo)
newDeck.createDeck()
newDeck.shuffle()
newDeck.draw()
console.log(newDeck.player1Deck.length)
console.log(newDeck.player2Deck.length)

























