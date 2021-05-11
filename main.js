import fs from 'fs';
import readline from 'readline';
import Sensors from './sensors/index.js'
import { generateLogFileMap } from './utils/file.js';

const evaluateLogFile = async (logFile) => {
  let results = {};
  let currentSensorName = '';
  let currentSensor = null;
  let readReference = true;
  let reference = {
    label: '',
    temp: 0,
    humidity: 0.0,
    CO: 0.0
  };
  let lineCount = 1;
  let skipToNext = false;
  let fileMap = await generateLogFileMap(logFile);
  let next = 0;
  
  const isData = (parsedLine) => {
    const keywords = ['reference', 'thermometer', 'humidity', 'monoxide'];
    const first = parsedLine[0];
    return keywords.findIndex((keyword) => first === keyword) < 0
  }

  const readInterface = readline.createInterface({
    input: fs.createReadStream(logFile),
    console: false
  });

  readInterface.on('line', (line) => {
    const parsedLine = line.split(' ');
    lineCount++;
    
    if (skipToNext && lineCount !== next) {
      return;
    } else if (lineCount === next) {
      skipToNext = false;
    }

    if (readReference) {
      [reference.label, reference.temp, reference.humidity, reference.CO] = parsedLine;
      readReference = false;
    } else if (isData(parsedLine)) {
      const ret = currentSensor.inprocess(parsedLine, reference);
      if (ret) {
        results[currentSensorName] = ret;
        skipToNext = true;
        next = fileMap.find((pos) => pos > lineCount);
      }
    } else {
      const [sensorType, name] = parsedLine;

      if (currentSensor) {
        results[currentSensorName] = currentSensor.postprocess(parsedLine, reference);
      }

      if (Sensors[sensorType]) {
        currentSensorName = name;
        currentSensor = Sensors[sensorType];
        currentSensor.preprocess(parsedLine, reference);
      } else {
        console.log(`Sensor type ${sensorType} doesn't exist!`)
        process.exit(0);
      }
    }
  })
  .on('close', () => {
    if (currentSensor) {
      results[currentSensorName] = currentSensor.postprocess(reference);
    }
    console.log(results);
    process.exit(0);
  });
}

evaluateLogFile('log.txt')