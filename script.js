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
            suits: ['Clubs','Diamonds','Hearts','Spades'],
            ranks: ['Ace','2','3','4','5','6','7','8','9','10','Jack','Queen','King'],
            scores: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
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
        const scores = this.cards.scores
        for (let i = 0; i < suits.length; i++) {
          for (let j = 0; j < ranks.length; j++) {
            this.deck.push(new Card(suits[i], ranks[j], scores[j]));
          }
        }
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
    }
  
    splitShuffledDeck() {
        this.player1Deck = this.shuffledCards.splice(0, 26)
        //console.log(this.player1Deck)
        //console.log(this.player1Deck.length)
        this.player2Deck = this.shuffledCards.splice(0, 26)
        //console.log(this.player2Deck)
        //console.log(this.player2Deck.length)
    }
  
    draw() {
      const player1Draw = this.player1Deck.shift()
      console.log(player1Draw)
      const player2Draw = this.player2Deck.shift()
      console.log(player2Draw)
      return this.vs(player1Draw, player2Draw)
    }
  
    vs(p1Draw, p2Draw) {
      if (this.player1Deck.length === 0) {
        return `${this.players[1].name} wins the game!`
      }
      if (this.player2Deck.length === 0) {
        return `${this.players[0].name} wins the game!`
      }
      if (p1Draw.score < p2Draw.score) {
        this.player2Deck.push(p1Draw)
        this.player2Deck.push(p2Draw)
        console.log('Player 2 gets the cards')
        console.log(`${this.players[1].name} has ${this.player2Deck.length} cards.`)
        console.log(`${this.players[0].name} has ${this.player1Deck.length} cards.`)
        return
      }
      if (p2Draw.score < p1Draw.score) {
        this.player1Deck.push(p2Draw)
        this.player1Deck.push(p1Draw)
        console.log('Player 1 gets the cards')
        console.log(`${this.players[0].name} has ${this.player1Deck.length} cards.`)
        console.log(`${this.players[1].name} has ${this.player2Deck.length} cards.`)
        return
      }
      this.chest.push(p1Draw)
      this.chest.push(p2Draw)
      console.log(this.chest)
      return this.war()         
    }
    
    war() {
      const player1Draw2 = this.player1Deck.splice(0,2)
      const player2Draw2 = this.player2Deck.splice(0,2)
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
const mo = new Players('Alex')
newDeck.addPlayer(mo)
newDeck.createDeck()
newDeck.shuffle()
newDeck.splitShuffledDeck()
newDeck.draw()
newDeck.draw()
newDeck.draw()
//console.log(newDeck.player1Deck)
//console.log(newDeck.player2Deck)
//console.log(newDeck.shuffledCards)

























