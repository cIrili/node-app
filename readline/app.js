const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Create a promise based version of rl.question
const question = (query) =>
  new Promise((resolve) => rl.question(query, resolve));

const types = {
  1: 'Choleric',
  2: 'Sanguine',
  3: 'Phlegmatic',
  4: 'Melancholic',
};

const game = {
  start: () => {
    return game.playGame();
  },

  playGame: async () => {
    const playGame = await question(
      'Do you wanna play a game? Please answer yes/no '
    );
    if (playGame === 'yes' || playGame === 'y') {
      return game.askQuestion();
    }
    if (playGame === 'no' || playGame === 'n') {
      console.log('Oh no...');
      return game.end();
    }
    console.log("Not quite right.. Let's try again:");
    return game.playGame();
  },

  askQuestion: async () => {
    const answer = await question(
      `Imagine someone sits on your hat. Your actions:
       1. Yell at the man;
       2. Laugh;
       3. Never even notice;
       4. Cry;
       Number chosen: `
    );

    for (const key of Object.keys(types)) {
      if (answer === key) {
        console.log(
          `You answered ${answer}; Your temperament type is: ${types[answer]}`
        );
        return game.end();
      }
    }
    console.log("Not quite right.. Let's try again:");
    return game.askQuestion();
  },

  end: () => {
    console.log('Have a nice day!');
    rl.close();
  },
};

// Start the program
game.start();
