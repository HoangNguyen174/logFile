export default Object.freeze({
  name: 'humidity',
  data: {
    status: 'keep'
  },
  preprocess(dataLine, ref) {
    this.data.status = 'keep';
  },
  inprocess(dataLine, ref) {
    const { humidity } = ref;
    const humidityReading = dataLine[1];
    if (Math.abs(humidityReading - humidity) > 1.0 && this.data.status !== 'discard') {
      this.data.status = 'discard';
      return this.data.status;
    }
  },
  postprocess(dataLine, ref) {
    return this.data.status;
  }
})

// class Humidity {
//   constructor() {
//     if (!Humidity.instance) {
//       this.name = 'humidity';
//       this.status = 'keep';
//       Humidity.instance = this;
//     }
//     return Humidity.instance;
//   }

//   evaluate(reference) {
//     return this.status;
//   }

//   processData(data, {humidity}) {
//     if (Math.abs(data[1] - humidity) > 1.0 && this.status !== 'discard') {
//       this.status = 'discard';
//     }
//   }
// }

// const instance = new Humidity();
// Object.seal(instance);

// export default instance;