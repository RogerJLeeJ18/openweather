const getIndividualDay = (list, i) => {
  return list[i].dt_txt.split(' ')[0].split('-')[2];
};

const separateDays = (list) => {
  const fullDayBucket = [];
  let dayChunkBucket = [];
  let dayX = getIndividualDay(list, 0);
  list.forEach((e, i) => {
    if (getIndividualDay(list, i) === dayX) {
      dayChunkBucket.push(list[i]);
    } else {
      fullDayBucket.push(dayChunkBucket);
      dayX = getIndividualDay(list, i);
      dayChunkBucket = [list[i]];
    }
  });
  fullDayBucket.push(dayChunkBucket);
  return fullDayBucket;
};

const tempConverter = (tempKel) => Math.round((Number(tempKel - 273.15)) * 9 / 5 + 32);

const getHighestHigh = (list) => {
  return tempConverter(list.sort()[list.length - 1]);
};

const getLowestLow = (list) => {
  return tempConverter(list.sort()[0]);
};

const cleanupForecastData = (responseData) => {
  const avgDays = [];
  separateDays(responseData).forEach((singleDayArray) => {
    const avgCondition = getAvgCondition(singleDayArray.map((threeHourChunk) => threeHourChunk.weather[0].description));
    const avgHumidity = getAvgHumidity(singleDayArray.map((threeHourChunk) => threeHourChunk.main.humidity));
    const avgWind = getAvgHumidity(singleDayArray.map((threeHourChunk) => threeHourChunk.wind.speed));
    const high = getHighestHigh(singleDayArray.map((threeHourChunk) => threeHourChunk.main.temp_max));
    const low = getLowestLow(singleDayArray.map((threeHourChunk) => threeHourChunk.main.temp_min));
    const day = getDays();
    avgDays.push({ high, low, avgCondition, avgHumidity, avgWind, day });
  });
  return avgDays;
};

const cleanupCurrentWeather = (responseData) => {
  let currentWeather;
  const conditions = responseData.weather[0].description;
  const humidity = responseData.main.humidity;
  const wind = Math.round(responseData.wind.speed);
  const high = tempConverter(responseData.main.temp_max);
  const low = tempConverter(responseData.main.temp_min);
  const currentTemp = tempConverter(responseData.main.temp);
  currentWeather = { high, low, conditions, humidity, wind, currentTemp };
  return currentWeather;
};

const getDays = ()=> {
  const d = new Date();
  const i = d.getDay();
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday'];
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
