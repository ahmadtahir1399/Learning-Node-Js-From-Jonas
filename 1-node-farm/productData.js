const fs = require("fs");
const http = require("http");
const url = require("url");
const replaceTemplate = require("./modules/replaceTemplate");

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCards = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });

    // Changed: Join the cardsHtml array into a string and replace the placeholder in tempOverview
    const cardsHtml = dataObj
      .map((data) => replaceTemplate(tempCards, data))
      .join(""); // Join the array into a string
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml); // Replace the placeholder with the cardsHtml string

    res.end(output); // Send the final output

    // Overview page
  } else if (pathname === "/product") {
    res.writeHead(200, { "Content-type": "text/html" });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);

    res.end(output);

    // Product page
  } else if (pathname === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);
    // API response
  } else {
    res.writeHead(404, {
      "content-type": "text/html",
      "my-own-header": "Bye_world",
    });
    res.end("<h1> Invalid URL </h1>");
    // 404 error page
  }
});

server.listen(3000, "127.0.0.1", () => {
  console.log("Listening to my SERVER 😎");
});
