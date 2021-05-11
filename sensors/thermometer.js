import { average, standardDeviation } from '../utils/math.js'

export default Object.freeze({
  name: 'thermometer',
  data: {
    tempArr: []
  },
  preprocess(dataLine, ref) {
  },
  inprocess(dataLine, ref) {
    const [time, temp] = dataLine;
    this.data.tempArr.push(parseFloat(temp));
  },
  postprocess(dataLine, ref) {
    const avg = average(this.data.tempArr);
    const stdDev = standardDeviation(this.data.tempArr);

    if (Math.abs(avg - ref.temp) < 0.5) {
      if (stdDev < 3) {
        return 'ultra precise';
      } else if (stdDev < 5) {
        return 'very precise';
      }
    } 
    return 'precise';
  }
})

// class Thermometer {
//   constructor() {
//     if (!Thermometer.instance) {
//       this.name = 'thermometer';
//       this.tempArr = [];
//       Thermometer.instance = this;
//     }
//     return Thermometer.instance;
//   }

//   evaluate({temp}) {
//     const avg = average(this.tempArr);
//     const stdDev = standardDeviation(this.tempArr);

//     if (Math.abs(avg - temp) < 0.5) {
//       if (stdDev < 3) {
//         return 'ultra precise';
//       } else if (stdDev < 5) {
//         return 'very precise';
//       }
//     } 
//     return 'precise';
//   }

//   processData(data) {
//     const [time, temp] = data;
//     this.tempArr.push(parseFloat(temp));
//   }
// }

// const instance = new Thermometer();
// Object.seal(instance);

// export default instance;

// function std_dev2(a, n) {
//   if(n == 0)
//       return 0.0;
//   sum = 0;
//   sq_sum = 0;
//   for(let i = 0; i < n; ++i) {
//      sum += a[i];
//      sq_sum += a[i] * a[i];
//   }
//   mean = sum / n;
//   variance = sq_sum / n - mean * mean;
//   return Math.sqrt(variance);
// }
