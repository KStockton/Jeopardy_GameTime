import chai from 'chai';
const expect = chai.expect;

import spies from 'chai-spies';
chai.use(spies);

// chai.spy.on(domUpdates, ['', ''], () => true);

import Clues from '../src/Clue.js'

describe('Clue', function() {
  it('Should return true', function() {
    var clue = new Clues()
    expect(true).to.equal(true);
  });
  it('Should have a default question', function() {
    var clue = new Clues();
    expect(clue.question).to.equal('What MTV plays 24 hours a day');
  });
  it('Should have a different question', function() {
    var clue = new Clues("In TV land, TNT doesn't stand for trinitrotoluene but for this");
    expect(clue.question).to.equal("In TV land, TNT doesn't stand for trinitrotoluene but for this");
  });
  it('Should have a default answer', function() {
    var clue = new Clues('Never give up', 200, 'music videos');
    expect(clue.answer).to.equal('music videos');
  });
  it('Should have a different pointValue', function() {
    var clue = new Clues('Never give up', 400);
    expect(clue.pointValue).to.equal(400);
  });
  it('should have a default categoryId', function() {
    var clue = new Clues('Never give up', 200 , 'music videos');
    expect(clue.categoryId).to.equal(10);
  });
  it('should have a different categoryId', function() {
    var clue = new Clues('What do you say when you attempt to shoot a balled up paper into the trashcan', 300,  'Curry with the Shot boy', 8);
    expect(clue.categoryId).to.equal(8);
  });
  it('should have a default pointValue', function() {
    var clue = new Clues();
    expect(clue.pointValue).to.equal(100);
  });
  it('should have a different answer', function() {
    var clue = new Clues('cheers?', 300, 'the Disney Channel');
    expect(clue.answer).to.equal('the Disney Channel');
  });
  it('should have a default dailyDble', function() {
    var clue = new Clues('Never give up', 200, 'music videos', 5);
    expect(clue.dailyDble).to.equal(false);
  });
  it('should have a different dailyDble', function() {
    var clue = new Clues('Never give up', 200, 'music videos', 5, true);
    expect(clue.dailyDble).to.equal(true);
  });
});
