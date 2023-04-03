const express = require('express');
const app = express();
const useragent = require('useragent');
const requestIp = require('request-ip');

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
