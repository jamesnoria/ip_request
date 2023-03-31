const express = require('express');
const app = express();

app.use(function(req, res, next) {
  const agent = req.headers['user-agent'];
  console.log(agent);
  if (agent) {
    const match = agent.match(/(chrome|firefox|safari|opera|edge|trident(?=\/))\/?\s*(\d+)/i);
    if (match) {
      const browser = match[1].replace(/trident/i, 'Internet Explorer');
      const version = match[2];
      const os = agent.match(/\((.*?)\)/)[1];
      req.useragent = {
        browser: browser,
        version: version,
        os: os
      };
    }
  }
  next();
});

app.get('/', function(req, res) {
  const browser = req.useragent ? req.useragent.browser : 'Desconocido';
  const version = req.useragent ? req.useragent.version : 'Desconocido';
  const os = req.useragent ? req.useragent.os : 'Desconocido';
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  res.json({
    browser: browser,
    version: version,
    os: os,
    ip: ip
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
