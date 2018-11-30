const dayGrabber = (list, i) => {
  return list[i].dt_txt.split(' ')[0].split('-')[2];
};

const separateDays = (list) => {
  let fiveBuckets = [];
  let bucket = [];
  let dayX = dayGrabber(list, 0);
  list.forEach((forecastObj, i) => {
    if (dayGrabber(list, i) === dayX) {
      bucket.push(list[i]);
    } else {
      fiveBuckets.push(bucket);
      dayX = dayGrabber(list, i);
      bucket = [list[i]];
    }
  });
  fiveBuckets.push(bucket);
  return fiveBuckets;
};

const tempConverter = (tempKel) => Math.round((Number(tempKel - 273.15)) * 9 / 5 + 32);

const getHighestHigh = (list) => {
  return tempConverter(list.sort()[list.length - 1]);
};

const getLowestLow = (list) => {
  return tempConverter(list.sort()[0]);
};

const cleanupForecastData = (responseData) => {
  let avgDays = [];
  
  separateDays(responseData).forEach((singleDayArray) => {
    let avgCondition = getAvgCondition(singleDayArray.map((threeHourChunk) => threeHourChunk.weather[0].description));
    let avgHumidity = getAvgHumidity(singleDayArray.map((threeHourChunk) => threeHourChunk.main.humidity));
    let avgWind = getAvgHumidity(singleDayArray.map((threeHourChunk) => threeHourChunk.wind.speed));
    let high = getHighestHigh(singleDayArray.map((threeHourChunk) => threeHourChunk.main.temp_max));
    let low = getLowestLow(singleDayArray.map((threeHourChunk) => threeHourChunk.main.temp_min));
    const day = getDays()
    avgDays.push({ high, low, avgCondition, avgHumidity, avgWind, day });
  });
  return avgDays;
};

const cleanupCurrentWeather = (responseData) => {
  let currentWeather;
  let conditions = responseData.weather[0].description;
  let humidity = responseData.main.humidity;
  let wind = Math.round(responseData.wind.speed);
  let high = tempConverter(responseData.main.temp_max);
  let low = tempConverter(responseData.main.temp_min);
  let currentTemp = tempConverter(responseData.main.temp);
  currentWeather = { high, low, conditions, humidity, wind, currentTemp };
  return currentWeather;
};

const getDays = ()=> {
  const d = new Date();
  const i = d.getDay();
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"];
  return days.slice(i, i + 6);
};

const getAvgCondition = (arr) => {
  return arr.sort((a, b) => {
    return arr.filter(v => v === a).length - arr.filter(v => v === b).length;
  }).pop();

};


const getAvgHumidity = (list) => {
  let sum = 0;
  for (let i = 0; i < list.length; i++) {
    sum += parseInt(list[i], 10);
  }
  return Math.round(sum / list.length);
};

module.exports = { cleanupForecastData, cleanupCurrentWeather };
