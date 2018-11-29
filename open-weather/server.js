const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();
const { apiKey } = require('./weatherapi');
const axios = require('axios');
const { cleanupForecastData } = require('./util');

app.use(cors());
app.use(bodyParser.json());

router.route('/current').get((req, res) => {
  axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${req.query.q}&APPID=${apiKey}`)
    .then((response) => {
      
    })
    .catch((err) => {
      console.error(err);
    });
});

router.route('/forecast').get((req, res) => {
  axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${req.query.q}&APPID=${apiKey}`)
    .then((response) => {
      
      res.send(cleanupForecastData(response.data.list));
    })
    .catch((err) => {
      console.error(err);
    });
});

app.use('/', router);
app.listen(4000, () => console.log('Express server running on port 4000'));