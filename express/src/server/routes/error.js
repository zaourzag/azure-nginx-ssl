
const req = require('@aero/http');
const { randomJoke } = require('../../readdir')
const code = require('./code')
function validateQuery(fields) {
	// eslint-disable-next-line consistent-return
	return (req, res, next) => {
		// eslint-disable-next-line no-restricted-syntax
		for (const field of fields) {
			if (!req.query[field]) {
				// Field isn't present, end request
				return res.status(400).send({ error: `${field} is missing` });
			}
		}

		next();
	};
}
module.exports = (app) => {
  app.use('*', (req, res) => {
    const { url } = randomJoke();
    res.render('404', { url });
  })
  
  
  //app.use('/api', code);





};
