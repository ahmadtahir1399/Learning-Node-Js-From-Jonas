const fs = require("fs");
const superagent = require("superagent");

const readFilePromise = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, "utf-8", (err, data) => {
      if (err) reject("NO FILE 🗿");
      resolve(data.trim());
    });
  });
};

const writeFilePromise = (file, content) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, content, (err) => {
      if (err) reject("FILE ERROR 🔴");
      resolve("SUCCESS 🟢");
    });
  });
};
const getDogPic = async () => {
  try {
    const data = await readFilePromise(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    const imageRes1 = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const imageRes2 = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const imageRes3 = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const allImage = await Promise.all([imageRes1, imageRes2, imageRes3]);
    const dogImg = allImage.map((allDogImage) => allDogImage.body.message);
    console.log(dogImg);

    await writeFilePromise("dog-img.txt", dogImg.join("\n"));
    console.log("Random dog image saved to file!");
  } catch (error) {
    console.log(error.message);
    throw err;
  }
  return "2: READY 🐶";
};

(async () => {
  try {
    console.log("1: Will get dog pics!");
    const x = await getDogPic();
    console.log(x);
    console.log("3: Done getting dog pics!");
  } catch (err) {
    console.log("ERROR 💥");
  }
})();

// readFilePromise(`${__dirname}/dog.txt`)
//   .then((data) => {
//     console.log("breed:", data);
//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//   })
//   .then((res) => {
//     console.log(res.body.message);
//     return writeFilePromise("dog-img.txt", res.body.message);
//   })
//   .then(() => {
//     console.log("Random image saved to the file 😎");
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });
