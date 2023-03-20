const http = require("http");
const express = require("express");
const parser = require("ua-parser-js");
const { CekML } = require("./src/cek-game");

// Setting App
const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 8080;

// Setting Express
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Cek ID Game
app.get("/ml", async (req, res) => {
  const gameID = req.query.user;
  const zoneID = req.query.zone;
  const apikey = req.query.apikey;

  if (apikey && gameID && zoneID) {
    if (apikey == "apikey") {
      axios
        .post(
          "https://api.duniagames.co.id/api/transaction/v1/top-up/inquiry/store",
          {
            productId: 1,
            itemId: 2,
            catalogId: 57,
            paymentId: 741,
            gameId: "364591892",
            zoneId: "3728",
            product_ref: "REG",
            product_ref_denom: "REG",
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error.response);
        });
    } else {
      res.send({ success: false, result: "Apikey tidak ditemukan!" });
    }
  } else {
    res.send({ success: false, result: "Parameter tidak valid!" });
  }
});

// User Agent Parser
app.get("/ua", function (req, res) {
  const agent = req.query.ua;
  const apikey = req.query.apikey;

  if (apikey) {
    if (apikey == "apikey") {
      const ua = parser(agent || req.headers["user-agent"]);
      res.send({
        success: true,
        result: {
          user_agent: `${ua.ua}`,
          browser_name: `${ua.browser.name}`,
          browser_version: `${ua.browser.version}`,
          browser_major: `${ua.browser.major}`,
          engine_name: `${ua.engine.name}`,
          engine_version: `${ua.engine.version}`,
          os_name: `${ua.os.name}`,
          os_version: `${ua.os.version}`,
          device_vendor: `${ua.device.vendor}`,
          device_model: `${ua.device.model}`,
          device_type: `${ua.device.type}`,
          cpu_architecture: `${ua.cpu.architecture}`,
        },
      });
    } else {
      res.send({ success: false, result: "Invalid Apikey!" });
    }
  } else {
    res.send({ success: false, result: "Invalid Parameter!" });
  }
});

server.listen(port, function () {
  console.log("The application is running successfully on the port: " + port);
});
