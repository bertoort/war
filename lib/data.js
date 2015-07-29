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

var rounds = 0;
var wars = 0;
var draws = 0;
var lostWars = 0;
var doubleWar = 0;
var warAfterWar = 0;
var winnerAceCount = [
  {start: 0, win: 0},
  {start: 0, win: 0},
  {start: 0, win: 0},
  {start: 0, win: 0},
  {start: 0, win: 0}
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

function DataGame(){
  this.players = [];
  this.deck = deck;
  this.atWarPlayers = [];
}

DataGame.prototype.setGame = function(num){
  var players = num || 2;
  if (players > 9) {
    players = 9;
  } else if (players < 2) {
    players = 2
  }
  for(i=0;i<players; i++){
    var name = 'player' + (i + 1);
    this.players.push(new Player(name));
  }
  var deck = shuffle(this.deck);
  while(deck.length > 0) {
    this.players.forEach(function (player,ind,arr) {
      if (deck.length > 0) {
        var card = deck.splice(0,1);
        player.hand.push(card[0]);
      }
      player.start();
    })
  }
  this.players.forEach(function (player) {
    var aces = player.hand.filter(function (card) {
      if (card.score === 14) {
        return card
      }
    })
    if (aces.length > 0) {
      player.aceCount = aces.length;
      winnerAceCount[aces.length].start++
    } else {
      player.aceCount = 0;
      winnerAceCount[0].start++
    }
  })
  this.deck = [];
}

DataGame.prototype.startGame = function () {
  this.compare();
}

DataGame.prototype.gameOver = function (loser) {
  this.players.forEach(function (player) {
    if (loser.indexOf(player) < 0) {
      player.collection.forEach(function (card) {
        player.hand.push(card)
      })
      deck = player.hand
      winnerAceCount[player.aceCount].win++
    }
  })
}

DataGame.prototype.sortPlayers = function () {
  this.players.sort(function (a,b) {
    if (a.name < b.name)
    return -1
    if (a.name > b.name)
    return 1
    return 0
  })
}

DataGame.prototype.compare = function () {
  var loser = [];
  var playingCards = [];
  var playingScores = [];
  var winner;
  this.sortPlayers();
  //check for lost players and refreshes hand for active players
  this.players.forEach(function (player) {
    if (player.hand.length === 0 && player.collection.length === 0) {
      loser.push(player)
    } else {
      if (player.hand.length === 0 && player.collection.length > 0) {
        player.collection = shuffle(player.collection);
        player.collection.forEach(function (card) {
          player.hand.push(card)
        })
        player.collection = [];
      }
      if (player.hand.length > 0) {
        player.currentCard = player.hand[0];
      }
      player.playedCard = null;
    }
  });
  // game over if all but one player lost
  if (loser.length === this.players.length - 1) {
    this.gameOver(loser);
  } else {
    //active players play cards and it's displayed
    this.players.forEach(function (player) {
      if (loser.indexOf(player) < 0) {
        playingCards.push(player.currentCard);
        player.playedCard = player.currentCard;
        player.hand.splice(0,1);
        player.currentCard = [];
        playingScores.push(player.playedCard.score);
      }
    })
    //checks for war
    var highestScore = Math.max.apply(null, playingScores);
    playingScores = [];
    var highest = playingCards.filter(function (card) {
      if (card.score === highestScore) {
        return card
      }
    });
    if (highest.length > 1) {
      //sets players to war status and starts war
      wars++;
      var length = this.players.length;
      var j = 0;
      var movingPlayers = [];
      for (var i = 0; i < length; i++) {
        if (this.players[j].playedCard !== null && this.players[j].playedCard.score === highestScore) {
          movingPlayers.push(this.players.splice(j, 1));
        } else {
          j++
        }
      }
      movingPlayers.forEach(function (player) {
        this.atWarPlayers.push(player[0]);
      }.bind(this));
      this.war(playingCards);
    } else {
      // finds winner, gives cards and repeats round
      this.players.forEach(function (player) {
        if (loser.indexOf(player) < 0) {
          playingCards.forEach(function (card) {
            if (player.playedCard.score === highestScore) {
              winner = player;
            }
          });
        }
      })
      playingCards.forEach(function (card) {
        winner.collection.push(card);
      })
      rounds++;
      this.compare();
    }
  }
}

DataGame.prototype.war = function (bucket) {
  var winner;
  var loser = [];
  var playingCards = [];
  var playingScores = [];
  var winner;
  // at war players bury three cards, if they can't, they are losers
  this.atWarPlayers.forEach(function (player) {
    if (player.hand.length > 3) {
      var cards = player.hand.splice(0,3);
      cards.forEach(function (card) {
        bucket.push(card)
      })
      player.currentCard = player.hand[0];
    } else if (player.collection.length > 0) {
      player.collection.forEach(function (card) {
        player.hand.push(card);
      })
      player.collection = [];
      if (player.hand.length > 3) {
        var cards = player.hand.splice(0,3);
        cards.forEach(function (card) {
          bucket.push(card)
        })
        player.currentCard = player.hand[0];
      } else {
        loser.push(player);
        player.hand.forEach(function (card) {
          bucket.push(card)
        });
        player.hand = [];
      }
    } else {
      loser.push(player);
      player.hand.forEach(function (card) {
        bucket.push(card)
      });
      player.hand = [];
    }
  });
  //gameOver
  if (loser.length === this.atWarPlayers.length - 1) {
    this.atWarPlayers.forEach(function (player) {
      if (loser.indexOf(player) < 0) {
        bucket.forEach(function (card) {
          player.collection.push(card);
        })
      }
      this.players.push(player);
    }.bind(this))
    this.atWarPlayers = [];
    this.compare();
  } else {
    // at war players play cards and displays them
    this.atWarPlayers.forEach(function (player) {
      if (loser.indexOf(player) < 0) {
        playingCards.push(player.currentCard);
        player.playedCard = player.currentCard;
        player.hand.splice(0,1);
        player.currentCard = [];
        playingScores.push(player.playedCard.score);
      }
    })
    var highestScore = Math.max.apply(null, playingScores);
    playingScores = [];
    var highest = playingCards.filter(function (card) {
      if (card.score === highestScore) {
        return card
      }
    })
    if (highest.length > 1) {
      //starts another war with at war players
      playingCards.forEach(function (card) {
        bucket.push(card);
      })
      wars++;
      var length = this.atWarPlayers.length;
      var j = 0;
      var movingPlayers = [];
      for (var i = 0; i < length; i++) {
        if (this.atWarPlayers[j].playedCard.score !== highestScore) {
          movingPlayers.push(this.atWarPlayers.splice(j, 1));
        } else {
          j++
        }
      }
      movingPlayers.forEach(function (player) {
        this.players.push(player[0]);
      }.bind(this));
      doubleWar++;
      this.war(bucket);
    } else {
      // gives cards to at war winner and restarts rounds
      this.atWarPlayers.forEach(function (player) {
        if (loser.indexOf(player) < 0) {
          playingCards.forEach(function (card) {
            if (player.playedCard.score === highestScore) {
              winner = player;
            }
          });
        }
        player.playedCard = null;
      });
      playingCards.forEach(function (card) {
        bucket.push(card);
      })
      bucket.forEach(function (card) {
        winner.collection.push(card);
      })
      this.atWarPlayers.forEach(function (player) {
        this.players.push(player);
      }.bind(this));
      this.atWarPlayers = [];
      this.compare();
    }
  }
}

function Player(name) {
  this.name = name;
  this.hand = [];
  this.collection = [];
}

Player.prototype.start = function () {
  this.currentCard = this.hand[0];
}

function resetVars() {
  rounds = 0;
  wars = 0;
  draws = 0;
  lostWars = 0;
  doubleWar = 0;
  warAfterWar = 0;
  winnerAceCount = [
    {start: 0, win: 0},
    {start: 0, win: 0},
    {start: 0, win: 0},
    {start: 0, win: 0},
    {start: 0, win: 0}
  ];
}
//starts game with the push of a button

module.exports = function(number) {
  var i = 0;
  while(i < number) {
    var war = new DataGame();
    war.setGame(2);
    war.startGame();
    i++
  }
  var aces = {};
  winnerAceCount.forEach(function (e, i) {
    aces[i] = {total: (e.start).toFixed(0), won: ((e.win/e.start)*100).toFixed(0), start: ((e.start/number)*100).toFixed(0) }
  })
  var data = {rounds: (rounds/number).toFixed(0), wars: (wars/number).toFixed(0), doubleWars: (doubleWar/number).toFixed(0), aces: aces};
  resetVars();
  return data;
}
