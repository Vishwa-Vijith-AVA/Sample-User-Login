
const express = require("express");
const mssql = require("mssql");
const queries = require("./queries/query.js");

//GD_PD_06.4
//Here we define the app where it used to defined the express and in the port must be define then this file has the access control allow header and access control allow methods consist.
// express instance
const app = express();

// defining port
const port = 5000;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// API format
app.use(express.json());

// GD_PD_15 Here we have been connected to the DB as well as table then we have the queries where we fetch all the Data  from the DB as well as search filter query.
// Route setup
app.post("/add", async (req, res) => {
  res = await queries.addData(req, res);
});

// FM_PD_12 Here we have been connected to the DB as well as table then we have the queries where we fetch the previous Row ID  from the DB
//OLDID
app.get("/", async (req, res) => {
  res = await queries.Data(req, res);
});

app.post("/reset", async (req, res) => {
  res = await queries.updateRecord(req, res);
});

app.post("/attempt", async (req, res) => {
  res = await queries.Attempt(req, res);
});

// port listening
app.listen(port, () => {
  console.log(`App Is Running On port ${port}`);
});
