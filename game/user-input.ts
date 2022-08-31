import inquirer from "inquirer";

export class Input {
  async getUsername(): Promise<string> {
    const { name } = await inquirer.prompt({
      type: 'input',
      name: 'name',
      message: 'What is your name?'
    });
    return name;
  }

  async getGuess(player: string): Promise<number> {
    const { guess } = await inquirer.prompt({
      type: 'number',
      name: 'guess',
      message: `Enter the number ${player}`,
      validate(input, answers?) {
        if (input <= 100 && input >= 0) {
          return true;
        }
        return false;
      },
    });
    return guess;
  }

  async getAnswer(): Promise<boolean> {
    const { confirmation } = await inquirer.prompt({
      type: 'confirm',
      name: 'confirmation',
      message: 'Do you want to play again?'
    });
    return confirmation;
  }
}