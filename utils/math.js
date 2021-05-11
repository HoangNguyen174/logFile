export const average = function(data) {
  const sum = data.reduce(function(sum, value){
    return sum + value;
  }, 0);

  const avg = sum / data.length;
  return avg;
}

export const standardDeviation = function(data) {
  const avg = average(data);
  
  const squareDiffs = data.map(function(value){
    const diff = value - avg;
    const sqrDiff = diff * diff;
    return sqrDiff;
  });
  
  const avgSquareDiff = average(squareDiffs);

  const stdDev = Math.sqrt(avgSquareDiff);
  return stdDev;
}