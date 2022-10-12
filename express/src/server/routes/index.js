var fs = require('fs');
function validateQuery(fields) {
	// eslint-disable-next-line consistent-return
	return (req, res, next) => {
		// eslint-disable-next-line no-restricted-syntax
		for (const field of fields) {
			if (!req.params[field]) {
				// Field isn't present, end request
				return res.status(400).send({ error: `${field} is missing` });
			}
		}

		next();
}};
module.exports = (app) => {
    fs.readdirSync(__dirname).forEach(function(file) {
        if (file == "index.js") return;
        var name = file.substr(0, file.indexOf('.'));
        require('./' + name)(app);
    });
    app.get('/api/pokea/:id',
    validateQuery(['id']), async (req, res) => {
      //const req = require('@aero/http');
      const id = req.params.id;
      const api = `http://nginxt/details/${id}`;
      const exie = await exists(`./assets/${id}.jpeg`)
      const http = require('@aero/http');
     
    
      try {
        const pokemon = await http('https://pokeapi.co/api/v2/pokemon/' + id)
        .catch((err) => { res.status(400).send(`${err}: this likely means the pokemon does not exist or it is not in the database yet`); }).json();
        const poke = pokemon.name
      if (exie == false) {
      const puppeteer = require('puppeteer');
      const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
      const page = await browser.newPage();
      await page.goto(`${api}`, {waitUntil: 'networkidle2'});
      // await page.waitForNavigation();
      await page.setViewport({
        width: 1200,
        height: 1200,
      });
     const imageBuffer = await page.screenshot({
        type: 'jpeg',
        quality: 100,
        clip: {
          x: 0,
          y: 0,
          width: 1200,
          height: 1200,
        },
        omitBackground: true,
        fullpage: true
      });
    
      await browser.close();
    const fs = require('fs');
    
     // res.contentType('image/jpeg');
      const buf = await Buffer.from(imageBuffer, 'binary');
      fs.createWriteStream(`./assets/${poke}.jpeg`).write(buf);
      await res.status(200).send({sucess: 'true', image: buf});
      }
       else{
         const fs = require('fs');
    const image = fs.readFileSync(
      `./assets/${poke}.jpeg`
    )
     // res.contentType('image/jpeg');
      const buf = await Buffer.from(image, 'binary');
      await res.status(200).send({sucess: 'true',image: buf, status: 'ok'});
    } 
      } catch (error) {
       // console.log(error);
        res.status(404).send({sucess: 'false', error: `${error}: this likely means the pokemon does not exist or it is not in the database yet` });
      }
    });
    app.get('/api/poke/:id',
    validateQuery(['id']), async (req, res) => {
      //const req = require('@aero/http');
      const id = req.params.id;
      const api = `http://nginxt/details/${id}`;
      const exie = await exists(`./assets/${id}.jpeg`)
      const http = require('@aero/http');
     
    
      try {
        const pokemon = await http('https://pokeapi.co/api/v2/pokemon/' + id)
        .catch((err) => { res.status(400).send(`${err}: this likely means the pokemon does not exist or it is not in the database yet`); }).json();
        const poke = pokemon.name
      if (exie == false) {
      const puppeteer = require('puppeteer');
      const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
      const page = await browser.newPage();
      await page.goto(`${api}`, {waitUntil: 'networkidle2'});
      // await page.waitForNavigation();
      await page.setViewport({
        width: 1200,
        height: 1200,
      });
     const imageBuffer = await page.screenshot({
        type: 'jpeg',
        quality: 100,
        clip: {
          x: 0,
          y: 0,
          width: 1200,
          height: 1200,
        },
        omitBackground: true,
        fullpage: true
      });
    
      await browser.close();
    const fs = require('fs');
    
      res.contentType('image/jpeg');
      const buf = await Buffer.from(imageBuffer, 'binary');
      fs.createWriteStream(`./assets/${poke}.jpeg`).write(buf);
      await res.status(200).send(buf);
      }
       else{
         const fs = require('fs');
    const image = fs.readFileSync(
      `./assets/${poke}.jpeg`
    )
      res.contentType('image/jpeg');
      const buf = await Buffer.from(image, 'binary');
      await res.status(200).send(buf);
    } 
      } catch (error) {
        console.log(error);
        res.status(404).send({sucess: 'false', error: 'Something went wrong' });
      }
    });
}