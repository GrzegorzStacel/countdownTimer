export function determineBackgroundColor(targetDate) {
  if (isDateDifferenceLessThanTwoDays(targetDate)) {
    return "red";
  } else if (isDateDifferenceBetweenTwoAndSevenDays(targetDate)) {
    return "yellow";
  } else {
    return null;
  }
}

function isDateDifferenceLessThanTwoDays(targetDate) {
  const twoDaysInMillis = 172800000; // 2 days in milliseconds
  const currentDate = new Date();

  const targetDateObj = new Date(targetDate);

  // Calculate the time difference
  const timeDifference = targetDateObj.getTime() - currentDate.getTime();

  // Check if the time difference is less than 2 days
  return Math.abs(timeDifference) < twoDaysInMillis;
}

function isDateDifferenceBetweenTwoAndSevenDays(targetDate) {
  const sevenDaysInMillis = 604800000; // 7 days in milliseconds
  const currentDate = new Date();

  const targetDateObj = new Date(targetDate);

  //  Calculate the time difference
  const timeDifference = targetDateObj.getTime() - currentDate.getTime();

  // Check if the time difference is between 2 and 7 days
  return Math.abs(timeDifference) <= sevenDaysInMillis;
}
