import { Input } from "./user-input";
import inquirer from 'inquirer';

jest.mock('inquirer', () => ({
  prompt: jest.fn(() => ({})),
}));

describe('Input', () => {
  let userInput: Input;

  beforeEach(() => {
    userInput = new Input();
    jest.clearAllMocks();
  })
  it('calls inquirer.prompt() with the correct configuration on getUsername()', async () => {
    const input = {
      type: 'input',
      name: 'name',
      message: 'What is your name?'
    }
    await userInput.getUsername();
    expect(inquirer.prompt).toHaveBeenCalledTimes(1);
    expect(inquirer.prompt).toHaveBeenCalledWith(input);
  });

  it('calls inquirer.prompt() with the correct configuration on getGuess()', async () => {
    const name = 'Poghos';
    const input = {
      type: 'number',
      name: 'guess',
      message: `Enter the number ${name}`,
    }
    await userInput.getGuess(name);
    expect(inquirer.prompt).toHaveBeenCalledTimes(1);
    expect(inquirer.prompt).toHaveBeenCalledWith(expect.objectContaining(input));

    const mockedPrompt = inquirer.prompt as any as jest.Mock;

    const validateFn = mockedPrompt.mock.calls[0][0].validate;

    expect(validateFn(101)).toBe(false);
    expect(validateFn(-1)).toBe(false);
    expect(validateFn(0)).toBe(true);
  });

  it('calls inquirer.prompt() with the correct configuration on getAnswer()', async () => {
    const input = {
      type: 'confirm',
      name: 'confirmation',
      message: 'Do you want to play again?'
    };
    await userInput.getAnswer();
    expect(inquirer.prompt).toHaveBeenCalledTimes(1);
    expect(inquirer.prompt).toHaveBeenCalledWith(input);
  });
});