const http = require("http");
const express = require("express");
const parser = require("ua-parser-js");

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

app.get("/", (req, res) => {
  return res.status(200).json({
    status: true,
    author: "Ridwan",
    contact: "6285156008163"
  });
});

// User Agent Parser
app.get("/ua", function (req, res) {
  const agent = req.query.agent;
  const ua = parser(agent || req.headers["user-agent"]);
  return res.status(200).json({
    status: true,
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
});

app.all("*", (req, res) => {
  res.send({ success: false, result: "Halaman tidak ditemukan!" });
});

server.listen(port, function () {
  console.log("The application is running successfully on the port: " + port);
});
