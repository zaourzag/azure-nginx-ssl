const jokes = require('../index.json');
const urls = require('../urls.json');
const errorimg = [
	{
		"id": 1,
		"url": "https://http.cat/"
	},
	{
		"id": 2,
		"url": "https://http.dog/"
	}
]
const randomErrorr = (status) => {
 const  errorimg1 = Math.floor(Math.random() * errorimg.length);
   if (errorimg1.id === 2) {
     return errorimg1 + status + '.jpg';
   }
   else {
      return errorimg1 + status;
   }
};
const randomJoke = () => {
  return jokes[Math.floor(Math.random() * jokes.length)];
};
const randomURL = () => {
  return urls[Math.floor(Math.random() * urls.length)];
};
module.exports = { jokes, urls, errorimg,randomErrorr, randomURL, randomJoke };
