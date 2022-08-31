import { Game } from "./game";
import { Input } from "./user-input";

describe('Game', () => {
  let game: Game;
  let input: Input;

  beforeEach(() => {
    input = {
      getAnswer: jest.fn(),
      getGuess: jest.fn(),
      getUsername: jest.fn(),
    };
    game = new Game(input);
  })

  it('should initialized values on startGame', async () => {
    const name = 'Poghos';
    jest.spyOn(input, 'getUsername').mockResolvedValue(name);
    await game.startGame();
    const lifeLeft = Reflect.get(game, 'lifeLeft');
    const number = Reflect.get(game, 'number');
    const player = Reflect.get(game, 'player')
    expect(lifeLeft).toBe(6);
    expect(number).toBeGreaterThanOrEqual(0);
    expect(number).toBeLessThanOrEqual(100);
    expect(player).toBe(name);
  });

  it('should call newGame when guess is correct', async () => {
    const number = 5;
    jest.spyOn(input, 'getGuess').mockResolvedValue(number);
    jest.spyOn(game, 'newGame').mockResolvedValue(undefined);
    Reflect.set(game, 'number', number);
    await game.question();
    expect(game.newGame).toHaveBeenCalledTimes(1);
  });

  it('should call newGame when life=0', async () => {
    Reflect.set(game, 'lifeLeft', 1);
    Reflect.set(game, 'number', 66);
    jest.spyOn(game, 'newGame').mockResolvedValue(undefined);
    await game.question();
    expect(game.newGame).toHaveBeenCalledTimes(1);
  });

  it('should call question when guess is lower', async () => {
    jest.spyOn(input, 'getGuess').mockResolvedValue(50);
    Reflect.set(game, 'number', 51);
    jest.spyOn(game, 'newGame').mockResolvedValue(undefined);
    jest.spyOn(game, 'question');
    await game.question();
    expect(game.question).toHaveBeenCalledTimes(6);
  });

  it('should call question when guess is greater', async () => {
    jest.spyOn(input, 'getGuess').mockResolvedValue(52);
    Reflect.set(game, 'number', 51);
    jest.spyOn(game, 'newGame').mockResolvedValue(undefined);
    jest.spyOn(game, 'question');
    await game.question();
    expect(game.question).toHaveBeenCalledTimes(6);
  });

  it('should return if answer is incorrect', async () => {
    jest.spyOn(game, 'startGame');
    jest.spyOn(game, 'question');
    jest.spyOn(input, 'getAnswer').mockResolvedValue(false);
    await game.newGame();
    expect(game.startGame).not.toHaveBeenCalled();
    expect(game.question).not.toHaveBeenCalled();
  });
  it('should call startGame and question', async () => {
    jest.spyOn(game, 'startGame').mockResolvedValue();
    jest.spyOn(game, 'question').mockResolvedValue();
    jest.spyOn(input, 'getAnswer').mockResolvedValue(true);
    await game.newGame();
    expect(game.startGame).toHaveBeenCalledTimes(1);
    expect(game.question).toHaveBeenCalledTimes(1);
  });
});