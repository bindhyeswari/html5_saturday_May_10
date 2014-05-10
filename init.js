/*
* Creates a deck of cards
* Contains shuffle and deal functions
* This part creates a deck of cards WITHOUT the application of a module pattern
* Task of the trainee is to apply design patterns and organize the code by applying
* OOC and Functional Programming concepts
* */

// immediate function which does not pollute the global namespace
(function (){

    var suitDescription = ['Hearts', 'Spades', 'Clubs', 'Diamonds'];
    var valDescription = ['Ace',2,3,4,5,6,7,8,9,10,'Jack', 'Queen', 'King'];
    // build a deck of cards --> Array
    // Every card has the following setup
    // { suit: 0 to 3; val: 0 to 12 }

    function Deck(){
        this.cards = [];
        this.cardsToBeDealt = 2;
        this.shuffle = function(){
            var cards = this.cards;
            for (j = 0; j < cards.length; j++) {
                var index = Math.floor(Math.random() * cards.length);
                var temp = cards[j];
                cards[j] = cards[index];
                cards[index] = temp;
            }
        };
        this.deal = function(_players){
            console.log('You are insdie the deal...');
            console.log(_players);
            var _cards = this.cards;
            for (var i = 0; i < this.cardsToBeDealt; i++) {
                console.log('looping over deal ' + i + ' ...');
                _players.forEach(function(_player){
                    var dealtCard = _cards.shift();
                    console.log(dealtCard);
                    _player.cards.push(dealtCard);
                });
            }
        };

    }

    // deck of cards
    var deck = new Deck();

    var cardPrototype = {
        toString: function(){
            return valDescription[this.val] + ' of ' + suitDescription[this.suit];
        }
    };

    // loop for suit
    for (var i = 0; i < 4; i++ ) {
        // loop for value of card
        for (var j = 0; j < 13; j++) {
            var card = Object.create(cardPrototype);
            card.suit = i;
            card.val = j;
            deck.cards.push(card);
        }
    }

    var deck_description = deck.cards.map(function(elem){
        return card.toString();
    });
    console.log(deck_description);

    // Shuffle the deck
    deck.shuffle();

    // Initiate players
    var players = [];

    // Create a Player function to create players ...
    function Player(_name){
        this.name = _name; // take a name for the player and provide it
        players.push(this);
        this.remove = function(){ //removes a player from players in a game
            players.splice(players.indexOf(this), 1);
        };
        this.cards = [];
        this.getCardInfo = function(){
            var cardinfo = this.cards.map(function(elem){
                return elem.toString();
            });
            return cardinfo;
        };
    }

    // Create 4 dummy players
    new Player('Dan');
    new Player('Steven');
    new Player('Raj');
    new Player('Krithika');

    // Print all player data
    console.log(players);

    deck.deal(players);

    // show cards for each player
    players.forEach(function(_player){
        console.log(_player.name + ' has the following cards ... ');
        console.log(_player.getCardInfo());
    });

}());