var shuffle = require('./shuffle')

// TODO :rename
function Comparison(players) {
  this.players = players
  this.loser = []
  this.playingCards = []
}

Comparison.prototype.gameIsOver = function () {
  return this.loser.length === this.players.length - 1
}

Comparison.prototype.doStuff = function () {
  this.players.forEach(function (player) {
    if (player.hand.length === 0 && player.collection.length === 0) {
      this.loser.push(player)
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
  }, this);
};

Comparison.prototype.checkForWar = function (highestScore) {
  return this.playingCards.filter(function (card) {
    if (card.score === highestScore) {
      return card
    }
  });
};

Comparison.prototype.playCards = function (playingScores) {
  this.players.forEach(function (player) {
    var playerStillInPlay = this.loser.indexOf(player) < 0
    if (playerStillInPlay) {
      this.playingCards.push(player.currentCard);
      player.recordPlayedCard()
      playingScores.push(player.playedCard.score);
    }
  }, this)
};

Comparison.prototype.declareWinner = function (highestScore) {
  var winner
  this.players.forEach(function (player) {
    if (this.loser.indexOf(player) < 0) {
      this.playingCards.forEach(function (card) {
        if (player.playedCard.score === highestScore) {
          winner = player;
        }
      });
    }
  }, this)
  this.playingCards.forEach(function (card) {
    winner.collection.push(card);
  })
  return winner
};

Comparison.prototype.goToWar = function(highestScore){
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
  return movingPlayers
}

module.exports = Comparison
