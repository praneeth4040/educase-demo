const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const db = require("./db");
require("dotenv").config();
const schoolRoutes = require("./routes/schoolRoutes")

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


app.use("/",schoolRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
