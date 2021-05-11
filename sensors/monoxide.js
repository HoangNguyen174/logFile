export default Object.freeze({
  name: 'monoxide',
  data: {
    status: 'keep'
  },
  preprocess(dataLine, ref) {
  },
  inprocess(dataLine, ref) {
    const { CO } = ref;
    const coReading = dataLine[1];
    if (Math.abs(coReading - CO) > 3 && this.data.status !== 'discard') {
      this.data.status = 'discard';
      return this.data.status;
    }
  },
  postprocess(dataLine, ref) {
    return this.data.status;
  }
})

// class Monoxide {
//   constructor() {
//     if (!Monoxide.instance) {
//       this.name = 'monoxide';
//       this.status = 'keep';
//       Monoxide.instance = this;
//     }
//     return Monoxide.instance;
//   }

//   evaluate(reference) {
//     return this.status;
//   }

//   processData(data, { CO }) {
//     if (Math.abs(data[1] - CO) > 3 && this.status !== 'discard') {
//       this.status = 'discard';
//     }
//   }
// }

// const instance = new Monoxide();
// Object.seal(instance);

// export default instance;