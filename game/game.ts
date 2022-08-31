import { Input } from "./user-input";

function getRandom() {
  return Math.floor(Math.random() * 100);
}

export class Game {
  private lifeLeft = 6;
  private player = '';
  private number = getRandom();


  constructor(private input: Input) { }

  async startGame(): Promise<void> {
    this.player = await this.input.getUsername();
    this.number = getRandom();
    this.lifeLeft = 6;
  }
 
  async question() {
    const guess = await this.input.getGuess(this.player);

    if (guess === this.number) {
      console.log(`Congrats ${this.player}`);
      await this.newGame();
      return;
    }

    this.lifeLeft--;

    if (this.lifeLeft === 0) {
      console.log('The game is over');
      await this.newGame();
      return;
    }

    if (guess < this.number) {
      console.log('Too low');
      await this.question();
    }
    
    if (guess > this.number) {
      console.log('Too high');
      await this.question();
    }
  }

  async newGame() {
    const answer = await this.input.getAnswer();
    if (!answer) {
      return;
    }
    await this.startGame();
    await this.question();
  }
}

