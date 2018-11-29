const dayGrabber = (list, i) => {
  return list[i].dt_txt.split(' ')[0].split('-')[2];
};

const separateDays = (list) => {
  let fiveBuckets = [];
  let bucket = [];
  let currentDay = dayGrabber(list, 0);

  list.forEach((forecastObj, i) => {
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
  list.forEach((temp) => {
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

const getDays = ()=> {
  const d = new Date();
  const i = d.getDay();
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"];
  return days.slice(i, i + 5);
}

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

module.exports = { cleanupForecastData };
