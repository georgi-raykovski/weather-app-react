export const capitalizeEveryWord = (sentence) =>
  sentence.replace(/\b\w/g, (match) => match.toUpperCase());
