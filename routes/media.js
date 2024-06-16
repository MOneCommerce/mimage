var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/*", async function (req, res, next) {
  console.log(req.path);
  const sharp = require("sharp");
  const axios = require("axios");
  var fs = require("fs");
  var http = require("http");

  const input = (
    await axios({
      url: `https://global.damda.com/media/${req.path}`,
      responseType: "arraybuffer",
    })
  ).data;

  const output = await sharp(input)
    .webp({
      quality: 80,
    })
    .toBuffer();
  res.contentType("image/webp");
  res.send(output);
});

module.exports = router;
