var deck = [
//spades
 {card: ["🂡"], score: 14 },
 {card: ["🂮"], score: 13 },
 {card: ["🂭"], score: 12 },
 {card: ["🂫"], score: 11 },
 {card: ["🂪"], score: 10 },
 {card: ["🂩"], score: 9 },
 {card: ["🂨"], score: 8 },
 {card: ["🂧"], score: 7 },
 {card: ["🂦"], score: 6 },
 {card: ["🂥"], score: 5 },
 {card: ["🂤"], score: 4 },
 {card: ["🂣"], score: 3 },
 {card: ["🂢"], score: 2 },
//hearts//
 {card: ["🂡"], score: 14 },
 {card: ["🂾"], score: 13 },
 {card: ["🂽"], score: 12 },
 {card: ["🂻"], score: 11 },
 {card: ["🂺"], score: 10 },
 {card: ["🂹"], score: 9 },
 {card: ["🂸"], score: 8 },
 {card: ["🂷"], score: 7 },
 {card: ["🂶"], score: 6 },
 {card: ["🂵"], score: 5 },
 {card: ["🂴"], score: 4 },
 {card: ["🂳"], score: 3 },
 {card: ["🂲"], score: 2 },
//clubs
 {card: ["🃑"], score: 14 },
 {card: ["🃞"], score: 13 },
 {card: ["🃝"], score: 12 },
 {card: ["🃛"], score: 11 },
 {card: ["🃚"], score: 10 },
 {card: ["🃙"], score: 9 },
 {card: ["🃘"], score: 8 },
 {card: ["🃗"], score: 7 },
 {card: ["🃖"], score: 6 },
 {card: ["🃕"], score: 5 },
 {card: ["🃔"], score: 4 },
 {card: ["🃓"], score: 3 },
 {card: ["🃒"], score: 2 },
//diamonds
 {card: ["🃁"], score: 14 },
 {card: ["🃎"], score: 13 },
 {card: ["🃍"], score: 12 },
 {card: ["🃋"], score: 11 },
 {card: ["🃊"], score: 10 },
 {card: ["🃉"], score: 9 },
 {card: ["🃈"], score: 8 },
 {card: ["🃇"], score: 7 },
 {card: ["🃆"], score: 6 },
 {card: ["🃅"], score: 5 },
 {card: ["🃄"], score: 4 },
 {card: ["🃃"], score: 3 },
 {card: ["🃂"], score: 2 },
];

function shuffle(array) {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
  return array;
}

function Game(){
  this.players = [];
  this.deck = deck;
}

Game.prototype.startGame = function(players){
  for(i=0;i<players; i++){
    var name = 'player' + i;
    this.players.push(new Player(name));
  }
  var players = this.players;
  var deck = shuffle(this.deck);
  players.forEach(function (player,ind,arr) {
    var half_length = Math.ceil(deck.length / arr.length);
    var cards = deck.splice(0,half_length);
    player.hand.push(cards);
  })
  this.deck = [];
}

function Player(name) {
  this.name = name;
  this.hand = [];
  this.collection = [];
}

Player.prototype.addCard = function (card) {
  this.cards.push(card)
}
