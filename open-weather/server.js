const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();
const mockdata = require('./src/assets/forecast.json');
const mockdata2 = require('./src/assets/forecast2.json');
const { apiKey } = require('./weatherapi');
const axios = require('axios');

app.use(cors());
app.use(bodyParser.json());

router.route('/').get((req, res) => {
  res.send('Hello!');
});

// router.route('/forecast').get((req, res) => {
//   console.log(req.query.q);
//   if (req.query.q === 'New Orleans'){
//     res.send(mockdata);
//   } else {
//     res.send(mockdata2);
//   }
// });

router.route('/current').get((req, res) => {
  console.log(req.query.q);
  axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${req.query.q}&APPID=${apiKey}`)
    .then((response) => {
      
    })
    .catch((err) => {
      console.error(err);
    });
})

router.route('/forecast').get((req, res) => {
  console.log(req.query.q);
  axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${req.query.q}&APPID=${apiKey}`)
    .then((response) => {
      cleanupForecast(response.data.list[0]);
    })
    .catch((err) => {
      console.error(err);
    });
})
  
const cleanupCurrent = (responseData) => {
  let { weather } = responseData;
  let { description } = weather[0];
  let { main } = responseData;
  let { temp } = main;
  let { temp_max } = main;
  let { temp_min } = main;
  let { humidity } = main;
};

const tempConverter = (tempKel)=>{
  // console.log(Number(tempKel - 273.15))
  let fahrenheit = (Number(tempKel - 273.15)) * 9 / 5 + 32;
  return fahrenheit;
}

const cleanupForecast = (responseData)=>{
  
  let { weather } = responseData;
  let { description } = weather[0];
  let { main } = responseData;
  let { temp_max } = main;
  let { temp_min } = main;
  let { humidity } = main;
  let { wind } = responseData;
  let { speed } = wind;
  console.log(tempConverter(temp_max))
  console.log({conditions: description, temp_max, temp_min, humidity, wind: speed})
};
// if (req.query.q === 'New Orleans') {
//   res.send(mockdata);
// } else {
//   res.send(mockdata2);
// }
// });

app.use('/', router);

app.listen(4000, () => console.log(`Express server running on port 4000`));