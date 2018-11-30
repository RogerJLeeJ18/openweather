const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();
const { apiKey } = require('./weatherapi');
const axios = require('axios');
const { cleanupForecastData, cleanupCurrentWeather } = require('./util');

app.use(cors());
app.use(bodyParser.json());

router.route('/forecast').get((req, res) => {
  axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${req.query.q}&APPID=${apiKey}`)
    .then((respo) => {
      const currentWeather = cleanupCurrentWeather(respo.data);
      axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${req.query.q}&APPID=${apiKey}`)
        .then((response) => {
          const forecastData = cleanupForecastData(response.data.list);
          const returnData = [];
          returnData.push(currentWeather);
          forecastData.forEach((obj) => returnData.push(obj));
          res.send(returnData);
        })
        .catch((err) => {
          console.error(err);
        });
    })
    .catch((err) => {
      console.error(err);
    });
});

app.use('/', router);
app.listen(4000, () => console.log('Weather Up running at 4200'));
