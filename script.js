class Player {
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
      this.players.push(new Player(name))
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
}

const newDeck = new Deck();
const lex = new Player('Lex')
newDeck.addPlayer(lex)
const mo = new Player('Mo')
newDeck.addPlayer(mo)
console.log(newDeck.players)
newDeck.createDeck()
newDeck.shuffle()
console.log(newDeck.shuffledCards)