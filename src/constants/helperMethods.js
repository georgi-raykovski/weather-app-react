export const capitalizeEveryWord = (sentence) =>
  sentence.replace(/\b\w/g, (match) => match.toUpperCase());

export const getOpenWeatherImageLink = (image) =>
  `http://openweathermap.org/img/wn/${image}.png`;
