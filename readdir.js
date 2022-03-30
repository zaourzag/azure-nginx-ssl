const jokes = require('./index.json');

const randomJoke = () => {
  return jokes[Math.floor(Math.random() * jokes.length)];
};
module.exports = { jokes, randomJoke };
