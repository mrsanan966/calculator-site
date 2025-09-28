
export const SNOW_DAY_THRESHOLD = 60; // Arbitrary threshold for a likely snow day

export const calculateSnowDayProbability = (inputs) => {
  const { snowfall, timing, temperature, windSpeed, schoolPolicy } = inputs;
  let score = 0;

  // Snowfall amount (major factor)
  if (snowfall >= 12) score += 40;
  else if (snowfall >= 8) score += 30;
  else if (snowfall >= 4) score += 20;
  else if (snowfall >= 2) score += 10;

  // Timing (overnight/morning commute is more impactful)
  if (timing === "overnight") score += 15;
  else if (timing === "morning") score += 10;

  // Temperature (colder temps make snow stick and roads icy)
  if (temperature <= 20) score += 10;
  else if (temperature <= 32) score += 5;

  // Wind Speed (blowing snow reduces visibility)
  if (windSpeed >= 30) score += 15;
  else if (windSpeed >= 20) score += 10;
  else if (windSpeed >= 10) score += 5;

  // School Policy (adjusts the base score)
  if (schoolPolicy === "cautious") score *= 1.2;
  else if (schoolPolicy === "tough") score *= 0.8;

  // Cap probability at 100%
  const calculatedProbability = Math.min(Math.max(Math.round(score), 0), 100);
  return calculatedProbability;
};

export const getSnowDayProbabilityColor = (prob) => {
  if (prob >= 80) return "text-green-600";
  if (prob >= 60) return "text-yellow-600";
  if (prob >= 40) return "text-orange-600";
  return "text-red-600";
};

export const getSnowDayProbabilityMessage = (prob) => {
  if (prob >= 85) return "Almost Certain! Start planning your day off.";
  if (prob >= SNOW_DAY_THRESHOLD) return "Looking Good! High chance of a snow day.";
  if (prob >= 40) return "Maybe... Keep an eye on the forecast.";
  if (prob >= 20) return "Unlikely. Probably just a regular day.";
  return "Forget about it. Bundle up for school/work!";
};
  