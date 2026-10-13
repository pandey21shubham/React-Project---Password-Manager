const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { MongoClient } = require("mongodb");
const bodyParser = require('body-parser');

dotenv.config();

// Connection URL
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

// Database Name
const dbName = "passOP";

const app = express();
const port = 3000;

app.use(cors())
app.use(bodyParser.json());

client.connect();

// Get all the passwords
app.get("/", async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection("passwords");
  const findResult = await collection.find({}).toArray();
  res.json(findResult);
});

// Save a passwords
app.post("/", async (req, res) => {
  const password = req.body; 
  const db = client.db(dbName);
  const collection = db.collection("passwords");
  const findResult = await collection.insertOne(password);
  res.send({"success" : true, "result" : findResult})
});

// Delete a password by id
app.delete("/", async (req, res) => {
  const password = req.body; 
  const db = client.db(dbName);
  const collection = db.collection("passwords");
  const findResult = await collection.deleteOne(password); 
  res.send({"success" : true, "result" : findResult})
});


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
