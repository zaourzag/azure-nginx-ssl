const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swaggers.json');
const express = require('express');
const bodyParser = require('body-parser');
const expressip = require('express-ip');
const app = express();
const fs = require('fs');
const {randomURL } = require('../readdir');
const path = require('path');
const fileUpload = require('express-fileupload');
app.use(fileUpload());
const chartgenUrl = 'http://charts.zakariao.nl';
const { config }= require('../../config');
const { CoronaClient } = require('@aero/corona');
const corona = new CoronaClient();
const { CoronaGraphsClient } = require('@aero/corona-graphs');
const coronagraphs = new CoronaGraphsClient(corona, chartgenUrl);

const logger = require('morgan');
app.use(logger(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] -  :response-time ms ":referrer" ":user-agent" content-type - :type '));

//logger.token('type', function (req, res) { return req.headers['content-type'] })
//ogger(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] -  :response-time ms ":referrer" ":user-agent" content-type - :type ');
const errorimg = [
	{
		"id": 0,
		"url": "https://http.cat/"
	},
	{
		"id": 1,
		"url": "https://http.dog/"
	}
]
async function randomErrorr(status){
  

 const  errorimg1 = errorimg[Math.floor(Math.random() * errorimg.length)];
console.log(errorimg1);
const {url} = errorimg1;
    if (errorimg1.id ===1) {
   
     return errorimg1.url + status + '.jpg';
    }
   else {
      return errorimg1.url + status;
      
   }
};


const fa = fs.readFileSync("../logs/log.json", (error, data) => {
  if(error) {
      throw error;
  }

data.toString();
});
const prettyHtml = require('json-pretty-html').default;
const html = prettyHtml(fa);
// const access = fs.createWriteStream(__dirname + '/logs/log.json');
// process.stdout.write = process.stderr.write = access.write.bind(access);
const http = require('@aero/http');
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
	};
}
app.use(express.static( 'views'))
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.engine('.html', require('ejs').renderFile);
app.use(expressip().getIpInfoMiddleware);
var options = {
  explorer: true
};
const forwardedPrefixSwagger = async (req, res, next) => {
  req.originalUrl = (req.headers['x-forwarded-prefix'] || '') + req.url;
  next();
};

const root = require('path').join(__dirname, 'views');
app.use(express.static(root));

var options = {
  swaggerOptions: {
    url: "https://gist.githubusercontent.com/zaourzag/35d79c8fd01fb73a32467c6e0d8d02f4/raw/feaf11885468e67cd7ed7ef4eb75507eac0df3d5/swaggers.json "
  }
}

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(null, options));
const { promises: Fs } = require('fs');
const e = require('express');
const { ok } = require('assert');

async function exists (path) {  
  try {
    await Fs.access(path)
    return true
  } catch {
    return false
  }
}
app.get('/api/error/:error', async (req, res) => {
  
})

app.use('/api/logs', (req, res, next) => {
  res.set('Content-Type', 'text/html');
  res.send(Buffer.from(html));
  next()
})


app.use( async (req, res,error, next) =>{
 console.log(error)
 const status1 = res.status(500) 
 const status = status1.statusCode

 app.locals.status1 = status
 const url = await randomErrorr(status);
 console.log(url)
 res.render('error', { url, error, status })
})
app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );

  // Request headers you wish to allow
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );

  // Set to true if you need the website to include cookies in the requests sent


  // Pass to next layer of middleware
  next();
});
app.get('/api/corona/', async (req, res) => { 
 
  const { country } = req.params;

  const stats = await corona.total() || corona.getTotal();
  
		if (!stats) throw 'COMMAND_CORONA_INVALID_COUNTRY';

		res.status(200).send(stats)
	

});
app.get('/api/corona/:country', async (req, res) => { 
 
  const { country } = req.params;

	const stats = await corona.country(country).catch(() => null);
		if (!stats) throw 'COMMAND_CORONA_INVALID_COUNTRY';

		res.status(200).send(stats)
	

});
app.get('/api/coronag/', async (req, res) => { 
const graph = await coronagraphs.graph().catch(() => null);

 
if (graph) {
res.contentType('image/png');
await res.status(200).send(graph);
}
});

app.get('/api/coronag/:country', async (req, res) => { 
  const {country} = req.params;
  const graph = await coronagraphs.graph(country).catch(() => null);
  
   
  if (graph) {
  res.contentType('image/png');
  await res.status(200).send(graph);
  }
      else
      res.status(404).send({ error: `${country} is not a valid country` });
  });
app.get('/api/link', async (req, res) => {
  const {link } = req.query;
  const rndo = await randomURL();
  if (rndo.token) {
    const {link } = req.query;
const {token} = rndo;
  const short = await http(rndo.url + '/api/links/create')
          .post()
          .body({
              'link': link,
              'token': token,
          }, 'form').json()
          
  const { url, del_url } = short;
  res.contentType('json');
 
  console.log(short.url, link, url)
  const fuck = `${link} ==> ${short.url}`
  const a = fuck.split(/\r?\n/)
  console.log (a)
  fs.appendFileSync('./urls.txt',  `${a} \n`);
  res.send({ url: url, del_url: del_url });
}
else {
  const { link } = req.query;
  const short = await http(rndo.url + '/api/links/create')
          .post()
          .body({
              'link': link,
          }, 'form').json()
        
        
  
  const { url, del_url } = short;
  
  res.contentType('json');
  const fuck = `${link} ==> ${short.url}`
  const a = fuck.split(/\r?\n/)
  console.log(a)
  fs.appendFileSync('./urls.txt',  `${fuck} \n`);

  res.send({ url: url, del_url: del_url });
  
}});
app.get('/uploa', function(req, res) {
  //console.log(req.files.foo); // the uploaded file object
  res.render('up')
});
app.post('/upload',  async(req, res) =>{
  let sampleFile;
  let uploadPath;
const sxcu = require('sxcu.js')

  
  // console.log('req.files.sampleFile
  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).send('No files were uploaded.');
    return;
  }

  console.log('req.files >>>', req.files); // eslint-disable-line

  sampleFile = req.files.sampleFile;

  uploadPath = __dirname + '/uploads/' + sampleFile.name;

  sampleFile.mv(uploadPath, function(err) {
    if (err) {
      return res.status(500).send(err);
    }
return ok;
  });
  
const data1 = await Buffer.from(sampleFile.data, 'binary');
  const rndo = await randomURL();
  if (rndo.token) {
  console.log(sampleFile.name)
  const data = await Buffer.from(sampleFile.data, 'binary');
const {token} = rndo;
const url =rndo.url + '/api/files/create'
console.log(url)
 const image = new sxcu.Image(url, token)
  res.contentType('json');

image.attachFile(`${uploadPath}`)

image.upload() // Upload the image.
    .then(uploadedImg => {
      res.status(200).send({url: uploadedImg.getUrl(), del_url: uploadedImg.getDelUrl(), thumb: uploadedImg.getThumb()})
        console.log(`Upload URL: ${uploadedImg}`); // https://sxcujs.is-ne.at/qbu8Cp
    })
    .catch(console.error) // Print the error if thrown any while uploading the image.
  }
else {
  const data = await Buffer.from(sampleFile.data, 'binary');
  const url =rndo.url + '/api/files/create'
  console.log(url)
 const image = new sxcu.Image(url)
  res.contentType('json');

  image.attachFile(`${uploadPath}`)

image.upload() // Upload the image.
    .then(uploadedImg => {
     res.status(200).send({url: uploadedImg.getUrl(), del_url: uploadedImg.getDelUrl(), thumb: uploadedImg.getThumb()})
        console.log(`Upload URL: ${uploadedImg.getUrl()}`); // https://sxcujs.is-ne.at/qbu8Cp
    })
    .catch(console.error) // Print the error if thrown any while uploading the image.
  

}});
  


app.get('/api/pokea/:id',
validateQuery(['id']), async (req, res) => {
  //const req = require('@aero/http');
  const { id } = req.params;
    const http = require('@aero/http');
  const pokemon = await http('https://pokeapi.co/api/v2/pokemon/' + id).json()
  const api = `http://nginx-web-pokemon-api/details/${id}`;
  const exie = await exists(`./assets/${pokemon.name}.jpeg`)

  try {
   
    //.catch((err) => { res.status(400).send(`${err}: this likely means the pokemon does not exist or it is not in the database yet`); });
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
  const { id } = req.params;
    const http = require('@aero/http');
  const pokemon = await http('https://pokeapi.co/api/v2/pokemon/' + id).json()
  const api = `http://nginx-web-pokemon-api/details/${id}`;
  const exie = await exists(`./assets/${pokemon.name}.jpeg`)

 

  try {

   // .catch((err) => { res.status(400).send(`${err}: this likely means the pokemon does not exist or it is not in the database yet`); });
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
    res.status(404).send({sucess: 'false', error: `${error}: this likely means the pokemon does not exist or it is not in the database yet` });
  }
});

app.get('/api/ip', (req, res) => {
  const { headers } = req;

  const ip = headers['x-forwarded-for'] || req.socket.remoteAddress 
  res.send(ip);
})
app.get('/api/img', async (req, res) => {



  // Use child_process.spawn method from
  // child_process module and assign it
  // to variable spawn
  var spawn = require("child_process").spawn;

  // Parameters passed in spawn -
  // 1. type_of_script
  // 2. list containing Path of the script
  //    and arguments for the script

  // E.g : http://localhost:3000/name?firstname=Mike&lastname=Will
  // so, first name = Mike and last name = Will
  var process = spawn('python3',["/home/site/wwwroot/src/server/netflix.py"]);

  // Takes stdout data from script which executed
  // with arguments and send this data to res object
  process.stdout.on('data', async function(data) {
    const netflix = await http(`${data}`).raw()
res.contentType('image/png');
 const buf = await Buffer.from(netflix, 'binary');
  res.status(200).send(buf)

//        res.send(data.toString());
  }) })
  app.get("/api/v2/netflix", async (req,res) => {

    const fs = require('fs');
    const got = require('@aero/http');
    const jsdom = require("jsdom");
    const { JSDOM } = jsdom;
    
    const vgmUrl= 'https://www.netflix.com/nl-en/';
    
    const lol  = await got(vgmUrl).get().text().then(response => {
  
     
      const dom = new JSDOM(response);
    
      return( dom.window.document.querySelector("img").getAttribute('src'))
    });
    async function geturl() {
      const dom = new JSDOM(await lol);
     console.log(dom)
     console.log(dom.window.document.getElementsByClassName('#concord-img'));
      // console.log(dom.window.document.querySelector('#concord-img'));
    }
    const url =
    res.set("Content-Type", "text/html") 
   const rip = await got(lol).raw()
    res.contentType('image/jpeg');
    const buf = await Buffer.from(rip, 'binary');
   await res.send(buf)
  
  
  
  })
app.get('/api/links/view', (req, res) => {
  const {auth} = req.query;
  if (auth ===! 'Zakaria1') {
    res.status(401).send('Unauthorized');
  }
  else if (!auth) {
    res.status(401).send('Unauthorized');
  }

  
  else {
    fs.readFile('./urls.txt', (err, data) => {
      if (err) {
        res.status(500).send('Something went wrong');
      }
     const urls = data;
      res.status(200).render('read',{urls});
    })
  }
})
require('./routes')(app);
require('./routes/pokedex')(app);
require('./routes/url')(app);
// require('./routes/logs')(app);
module.exports = app;