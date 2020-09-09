const express = require("express");
const app = express();
const body_parser = require("body-parser");
const db = require("./db");
const path = require("path");

// parse JSON (application/json content-type)
app.use(body_parser.json());

const port = 4000;

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

app.get("/", (req, res) => {

// db setup
  const dbName = "covid_data";
  const collectionName = "dataTable";

  db.initialize(dbName, collectionName, function (dbCollection) {
    dbCollection.find().toArray(function (err, result) {
      if (err) throw err;
      res.render("home", {data: result});
      // return res.json(result);
      // console.log(result);
    });
    
  });
});

app.listen(port, () => {
  console.log(`Server listening at ${port}`);
});
