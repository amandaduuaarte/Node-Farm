const fs = require("fs");

const http = require("http");
const url = require("url");

const replaceTemplate = require("./modules/replaceTemplate");

const templateOverview = fs.readFileSync(
  "./templates/template-overview.html",
  "utf-8"
);
const templateProduct = fs.readFileSync(
  "./templates/template-product.html",
  "utf-8"
);
const templateCard = fs.readFileSync("./templates/template-card.html", "utf-8");

const data = fs.readFileSync("./dev-data/data.json", "utf-8");
const dataObject = JSON.parse(data);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  //Overview
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, {
      contentType: "text/html",
    });

    const cardsHtml = dataObject.map((item) =>
      replaceTemplate(templateCard, item)
    );
    const output = templateOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);
    res.end(output);

    //Product
  } else if (pathname === "/product") {
    res.writeHead(200, {
      contentType: "text/html",
    });
    const product = dataObject[query.id];
    const output = replaceTemplate(templateProduct, product);
    res.end(output);

    //API
  } else if (pathname === "/api") {
    res.writeHead(200, {
      contentType: "application/json",
    });
    res.end(data);

    //Not found
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
