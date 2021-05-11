import fs from 'fs';
import readline from 'readline';

export const generateLogFileMap = (filePath) => {
  return new Promise((resolve, reject) => {
    const readInterface = readline.createInterface({
      input: fs.createReadStream(filePath),
      console: false
    });

    let lineCount = 1;
    let sensorLinePos = [];

    readInterface.on('line', (line) => {
      const parsedLine = line.split(' ');

      const isSensor = (parsedLine) => {
        const keywords = ['thermometer', 'humidity', 'monoxide'];
        const first = parsedLine[0];
        return keywords.findIndex((keyword) => first === keyword) > -1
      }

      if (isSensor(parsedLine)) {
        sensorLinePos.push(lineCount);
      }

      lineCount++;
    }).on('close', () => {
      resolve(sensorLinePos)
    });
  })
}
