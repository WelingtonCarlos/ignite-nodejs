import http from "node:http";
import { Transform } from "node:stream";

class ConvertToNegativeNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const number = Number(chunk.toString("utf8"));

    const result = number * -1;

    const buf = Buffer.from(`${result} `, "utf8");

    this.push(buf);

    console.log(result);

    callback();
  }
}

const server = http.createServer(async (request, response) => {
  const buffers = [];

  for await (const chunk of request) {
    buffers.push(chunk);
  }

  const buffer = Buffer.concat(buffers).toString("utf8");

  console.log(buffer);

  return response.end(buffer);

  // request.pipe(new ConvertToNegativeNumberStream()).pipe(response);
});

server.listen(3334);
