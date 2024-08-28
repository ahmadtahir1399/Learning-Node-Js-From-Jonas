const fs = require("fs");

const fs = require("fs");

const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
const textOut = `My knowledge about avocado is : \n ${textIn}. also i write this on ${Date.now()}`;
fs.writeFileSync("./txt/output.txt ", textOut);

fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
  if (err) return console.log("ERROR! 💥🤯");
  console.log(data1, ":");

  fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
    console.log(data2);
    if (err) return console.log("ERROR! 💥🤯");

    fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
      console.log(data3);
      if (err) return console.log("ERROR! 💥🤯");

      fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, () => {
        console.log("File written successfully!");
      });
    });
  });
});
console.log("----------RESPONSE----------");
