import { Readable, Writable, Transform } from "node:stream";

class OneToHundredStream extends Readable {
  index = 1;

  _read() {
    const i = this.index++;

    setTimeout(() => {
      if (i > 100) {
        this.push(null);
      } else {
        const buf = Buffer.from(`${i} `, "utf8");

        this.push(buf);
      }
    }, 500);
  }
}

class MultiplyByTwoStream extends Writable {
  _write(chunk, encoding, callback) {
    const number = Number(chunk.toString("utf8"));

    const result = number * 2;

    console.log(result);

    callback();
  }
}

class ConvertToNegativeNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const number = Number(chunk.toString("utf8"));

    const result = number * -1;

    const buf = Buffer.from(`${result} `, "utf8");

    this.push(buf);

    callback();
  }
}

new OneToHundredStream()
  .pipe(new ConvertToNegativeNumberStream())
  .pipe(new MultiplyByTwoStream());
