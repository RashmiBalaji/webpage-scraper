'use strict';
require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors'); 
const path = require('path'); 
const router = require('./Router/router');

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(router);
if (process.env.NODE_ENV === "production"{
      app.use(express.static("build"));
      app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname,  "build", "index.html"));
      });
    }
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT} 🚀`); // eslint-disable-line no-console
});
