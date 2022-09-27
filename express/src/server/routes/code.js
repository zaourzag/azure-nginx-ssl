const http = require('@aero/http');
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
	app.get('/api/code-img/:code', async (req, res) => {
		
		// eslint-disable-next-line prefer-destructuring
		const code = req.params.code;
		const api = ' https://carbonara.aero.bot';
		const img = await http(api)
			.post()
			.path('/api/cook')
			.body(
				{
					code,
					language: 'auto',
					theme: 'one-dark',
					backgroundColor: 'rgb(54, 57, 63)',
					fontFamily: 'JetBrains Mono',
					paddingHorizontal: '20px',
					paddingVertical: '20px',
					windowControls: false,
					dropShadowBlurRadius: '10px',
					dropShadowOffsetY: '0px',
				},
				'json'
			)
			.raw();
		res.contentType('text/jpeg');
		const buf = await Buffer.from(img, 'binary');
		res.status(200).send({ code: buf });
		// eslint-disable-next-line no-sequences
	}),
		app.get(
			'/api/nekobot/',
			validateQuery(['text', 'type', 'username']),
			async (req, res) => {
        
				// If it reaches here, you can be sure that all the fields are not empty.
				// eslint-disable-next-line global-require

				// eslint-disable-next-line prefer-destructuring
				// eslint-disable-next-line no-shadow
				// const { type } = req.query;
				const { text, username, type } = req.query;
				// eslint-disable-next-line no-console
				console.log({ text, username, type });
				const api1 = `https://nekobot.xyz/api/imagegen?type=${type}`;
				// eslint-disable-next-line no-useless-concat
				const api = `${api1}&text=${text}` + `&username=${username}`;
				const img = await http(api).json();
				const response = img.message;
				const status2 = img.status;
				res.contentType('text/json');
				res.send({ img: response, status: status2 });
			}
		);
	app.get(
		'/api/code/', validateQuery(['code']),
		async (req, res) => {
			// If it reaches here, you can be sure that all the fields are not empty.
			if (req.query.image === 'false') {
				
				// eslint-disable-next-line prefer-destructuring
				const code = req.query.code;
				const api = ' https://carbonara.aero.bot';
				const img = await http(api)
					.post()
					.path('/api/cook')
					.body(
						{
							code,
							language: 'auto',
							theme: 'one-dark',
							backgroundColor: 'rgb(54, 57, 63)',
							fontFamily: 'JetBrains Mono',
							paddingHorizontal: '20px',
							paddingVertical: '20px',
							windowControls: false,
							dropShadowBlurRadius: '10px',
							dropShadowOffsetY: '0px',
						},
						'json'
					)
					.raw();
				res.contentType('image/text');
				const buf = await Buffer.from(img, 'binary');
				res.status(200).send({ buf });
			}
			else  {
				
				// eslint-disable-next-line prefer-destructuring
				const code = req.query.code;
				const api = ' https://carbonara.aero.bot';
				const img = await http(api)
					.post()
					.path('/api/cook')
					.body(
						{
							code,
							language: 'auto',
							theme: 'one-dark',
							backgroundColor: 'rgb(54, 57, 63)',
							fontFamily: 'JetBrains Mono',
							paddingHorizontal: '20px',
							paddingVertical: '20px',
							windowControls: false,
							dropShadowBlurRadius: '10px',
							dropShadowOffsetY: '0px',
						},
						'json'
					)
					.raw();
				res.contentType('image/jpeg');
				const buf = await Buffer.from(img, 'binary');
				res.send(buf);
		}})}