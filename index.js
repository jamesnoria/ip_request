const express = require('express');
const app = express();
const useragent = require('useragent');
const requestIp = require('request-ip');
const UAParser = require('ua-parser-js');

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

app.get('/ip1', function(req, res) {
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

app.get('/ip2', function (req, res) {
  const parser = new UAParser();
  const result = parser.setUA(req.headers['user-agent']).getResult();
  const brand = result.device.vendor;
  const model = result.device.model;
  res.send(`Brand: ${brand}, Model: ${model}`);
});

app.get('/', (req, res) => {
  const source = req.headers['user-agent'];
  const agent = useragent.parse(source);
  const ip = requestIp.getClientIp(req);

  const browser = agent.family;
  const browserVersion = agent.toVersion();
  const operatingSystem = agent.os.family;
  const device = agent.device.family;
  const brand = agent.device.brand;
  const model = agent.device.model;

  console.log(agent.device)

  res.send({
    brw_navegador: browser,
    brw_version: browserVersion,
    brw_sist_operativo: operatingSystem,
    brw_dispositivo: device,
    brw_marca: brand,
    brw_modelo: model,
    transaccion_ip: ip
  });
});

app.listen(3000, () => console.log('Server listening on port 3000'));
