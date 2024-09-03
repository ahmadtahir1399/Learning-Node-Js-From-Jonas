const EventEmitter = require("events");
const http = require("http");

class Sales extends EventEmitter {
  constructor() {
    super();
  }
}

const myEmitter = new Sales();

myEmitter.on("newSale", () => {
  console.log("new sale registered");
});

myEmitter.on("newSale", () => {
  console.log("Customer Name: KHALI");
});

myEmitter.on("newSale", (Sale) => {
  console.log(`this is our total sale ${Sale} of 2 September`);
});

myEmitter.emit("newSale", 100);

// -------------------------------------------

const server = http.createServer();

server.on("request", (req, res) => {
  console.log("Request hit");
  console.log(req.url);
  res.end("Ahmad bhai");
});

server.on("request", (req, res) => {
  console.log("Another Request hit");
});

server.on("close", () => {
  console.log("Server closed");
});

server.listen(3000, "127.0.0.1", () => {
  console.log("Waiting for requests...");
});
