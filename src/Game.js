import $ from 'jquery';
import Player from './Player.js'; // need
import Clues from './Clue.js'; // need
import DailyDouble from './dailyDouble.js';
import Rounds from './Round.js'; // need
import Category from './Category.js'; // need
import Data from './data.js'; // need
import DomUpdates from './domUpdates.js'; // need

class Game {
  constructor() {
    this.activePlayer = 0;
    this.playerArray = []; // Stores all the players instances
    this.categoryArray = []; // Stores all the categories together
    this.allClues = []; // Stores all the clues together
    this.roundsArray = []; // Stores all the rounds/game boards
    this.rndInst = new Rounds(0); // game.round to call round here
  }

  startGame(game, p1, p2, p3) {
    this.createPlayers(p1, p2, p3);
    this.createClues();
    this.createCategories();
    this.rndInst.initializeShuffle(game, 0, 4);
    DomUpdates.buildGameBoard(game, 0);
  }

  buildArray(game) {
    this.rndInst.filterArr(game, this.categoryArray, this.allClues, 4, 8);
    DomUpdates.buildGameBoard(game, 4);
  }

  createPlayers(p1, p2, p3) {
    let playerInst1 = new Player(p1);
    let playerInst2 = new Player(p2);
    let playerInst3 = new Player(p3);
    this.playerArray.push(playerInst1);
    this.playerArray.push(playerInst2);
    this.playerArray.push(playerInst3);
    DomUpdates.buildScoreBoard(this.playerArray);
  }

  createClues() {
    Object.values(Data.clues).forEach(clue => {
      this.allClues.push(new Clues(clue.question, clue.pointValue, clue.answer, clue.categoryId));
    });
  }

  createCategories() {
    Object.entries(Data.categories).forEach(category => {
      this.categoryArray.push(new Category(category[0].replace(/([a-z])([A-Z])/g, '$1 $2').toUpperCase(), category[1]));
    });
  }

  getClue(game, event) {
    let cardId = event.target.id;
    let card = this.rndInst.questionsArray[this.rndInst.stage];
    this.rndInst.currentAnswer = card[cardId].answer;
    
    console.log(card[cardId]);
    card[cardId] instanceof DailyDouble ? DomUpdates.showDailyDbl(card[cardId]) : DomUpdates.showQuestion(card[cardId]);
    DomUpdates.disableCard(event);
    this.rndInst.pointValue = card[cardId].pointValue;
  }

  updatePlayerScore(game, points) {
    this.playerArray[this.activePlayer].score += points;
    DomUpdates.changePlayerScore(game);
    this.rndInst.cardCount -= 1;
    this.rndInst.checkStage(game);
  }

}

export default Game;
