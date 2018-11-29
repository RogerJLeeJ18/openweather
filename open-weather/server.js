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
      res.send(cleanupList(response.data.list));
    })
    .catch((err) => {
      console.error(err);
    });
});


const dayGrabber = (list, i) => {
  return list[i].dt_txt.split(' ')[0].split('-')[2];
};

const separateDays = (list) => {
  let fiveBuckets = [];
  let bucket = [];
  let currentDay = dayGrabber(list, 0);
  
  list.forEach((forecastObj, i)=>{
    if (dayGrabber(list, i) === currentDay) {
      bucket.push(list[i]);
    } else {
      fiveBuckets.push(bucket);
      currentDay = dayGrabber(list, i);
      bucket = [list[i]];
    }
  });
  return fiveBuckets;
};
const tempConverter = (tempKel) => Math.round((Number(tempKel - 273.15)) * 9 / 5 + 32);
const getHighestHigh = (list) => {
  let high;
  list.forEach((temp)=>{
    if (!high || high < temp) { high = temp; }
  });
  return tempConverter(high);
};
const getLowestLow = (list) => {
  let low;
  list.forEach((temp) => {
    if (!low || low < temp) { low = temp; }
  });
  return tempConverter(low);
};


const cleanupList = (responseData) => {
  let avgDays = [];
  separateDays(responseData).forEach((singleDayArray)=>{
    let avgCondition = getAvgCondition(singleDayArray.map((threeHourChunk)=> threeHourChunk.weather[0].description));
    let avgHumidity = getAvgHumidity(singleDayArray.map((threeHourChunk) => threeHourChunk.main.humidity));
    let avgWind = getAvgHumidity(singleDayArray.map((threeHourChunk) => threeHourChunk.wind.speed));
    let high = getHighestHigh(singleDayArray.map((threeHourChunk) => threeHourChunk.main.temp_max));
    let low = getLowestLow(singleDayArray.map((threeHourChunk) => threeHourChunk.main.temp_min));

    avgDays.push({ high, low, avgCondition, avgHumidity, avgWind });
  });
  return avgDays;
};

const getAvgCondition = (list) =>{
  // console.log(list)
  function mode(arr) {
    return arr.sort((a, b) => {
      return arr.filter(v => v === a).length - arr.filter(v => v === b).length;
    }).pop();
  }
  return mode(list);
};


  
const cleanupForecastObj = (responseData)=>{

  let { main } = responseData;
  let { speed } = responseData.wind;

  return {};
};

const getAvgHumidity = (list) => {
  let sum = 0;
  for (let i = 0; i < list.length; i++) {
    sum += parseInt(list[i], 10);
  }
  return Math.round(sum / list.length);
}
// if (req.query.q === 'New Orleans') {
//   res.send(mockdata);
// } else {
//   res.send(mockdata2);
// }
// });

app.use('/', router);

app.listen(4000, () => console.log('Express server running on port 4000'));