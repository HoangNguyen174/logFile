import ThermometerSensor from './thermometer.js';
import HumiditySensor from './humidity.js';
import MonoxideSensor from './monoxide.js';

export default {
  [ThermometerSensor.name]: ThermometerSensor,
  [HumiditySensor.name]: HumiditySensor,
  [MonoxideSensor.name]: MonoxideSensor
};
