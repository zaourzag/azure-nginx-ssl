const http = require('@aero/http');
const {randomURL } = require('../../readdir');
module.exports = (app) => {
    app.post('/api/link', async (req, res) => {
        const {link } = req.query;
        const rndo = await randomURL();
        if (rndo.token) {
          const {link } = req.query;
      const {token} = rndo;
        const img = await http(randomURL().url + '/api/links/create')
                .post()
                .body({
                    'link': link,
                    'token': token,
                }, 'form').json()
                
        const { url, del_url } = img;
        res.contentType('text/json');
       // res.send({ url: url, del_url: del_url });
        fs.writeFileSync('./urls.txt', `${link} ==> ${url}`);
        res.send({ url: url, del_url: del_url });
      }
      else if (!rndo.token) {
        
        const img = await http(rndo.url + '/api/links/create')
                .post()
                .body({
                    'link': link,
                }, 'form').json()
              
              
      
        const { url, del_url } = img;
        res.contentType('text/json');
        
       // res.send({ url: url, del_url: del_url });
        res.send({ url: url, del_url: del_url });
        fs.writeFileSync('./urls.txt', `${link} ==> ${url}`);
      }
      else if (!req.query.link) {
        
        const {link } = req.body;
      
        const img = await http(randomURL().url + '/api/links/create')
                .post()
                .body({
                    'link': link,
               }, 'form').json()
                
      const { url, del_url } = img;
       res.contentType('text/json');
       // res.send({ url: url, del_url: del_url });
       fs.writeFileSync('./urls.txt', `${link} ==> ${url}`);
       res.send({ url: url, del_url: del_url });
      }
      });
      


};