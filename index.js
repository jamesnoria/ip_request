const express = require('express');
const app = express();
const requestIp = require('request-ip');
const UAParser = require('ua-parser-js');

app.get('/', (req, res) => {
  const ip = requestIp.getClientIp(req);

  const parser = new UAParser();
  const result = parser.setUA(req.headers['user-agent']).getResult();

  const browser = result.browser.name;
  const browserVersion = result.browser.version;
  const operatingSystem = result.os.name;
  const device = result.device.type;
  const brand = result.device.vendor;
  const model = result.device.model;

  res.json({
    brw_navegador: browser,
    brw_version: browserVersion,
    brw_sist_operativo: operatingSystem,
    brw_dispositivo: device,
    brw_marca: brand,
    brw_modelo: model,
    transaccion_ip: ip,
  });
});

app.listen(3000, () => console.log('Server listening on port 3000'));
