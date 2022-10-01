const fs = require("fs");

const http = require("http");
const url = require("url");

const server = http.createServer((req, res) => {
  const pathName = req.url;

  if (pathName === "/" || pathName === "/overview") {
    res.end("Hello overview page");
  } else if (pathName === "/product") {
    res.end("Hello product page");
  } else if (pathName === "/api") {
    res.end("Hello api");
  } else {
    res.writeHead(404, {
      "Content-Type": "text/html",
      "my-own-header": "test",
    });
    res.end("<h1>Not found</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Server start!");
});
