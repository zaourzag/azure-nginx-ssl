const fs = require("fs");
const fa = fs.readFileSync("../logs/log.json", (error, data) => {
    if(error) {
        throw error;
    }
    console.log(data.toString());
data.toString();
});
const prettyHtml = require('json-pretty-html').default;
const html = prettyHtml(fa, fa);
module.exports = (app) => {
    app.use('/api/logs', (req, res, next) => {
     
      res.render(html);
      next()
    })
    
    
    //app.use('/api', code);
  
  
  
  

  };