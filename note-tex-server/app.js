const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

const port = 443;
app.listen(port, () => {
  console.log("Running on port: " + port);
});
