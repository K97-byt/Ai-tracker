// server.js
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let devices = [];

// Endpoint to receive device location
app.post("/track", (req, res) => {
  const { imei, lat, lng } = req.body;
  const now = new Date();
  const index = devices.findIndex(d => d.imei === imei);

  if(index >= 0){
    devices[index] = { imei, lat, lng, updatedAt: now };
  } else {
    devices.push({ imei, lat, lng, updatedAt: now });
  }

  res.send({ status: "ok" });
});

// Endpoint to get all device locations
app.get("/devices", (req, res) => {
  res.json(devices);
});

app.listen(PORT, () => console.log(`Backend running at http://localhost:${PORT}`));
