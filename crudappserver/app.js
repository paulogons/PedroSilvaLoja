const mongoose = require("mongoose");
const body_parser = require("body-parser");
const clientes = require("./routes/clientes");
var cors = require("cors");

var express = require("express");
var app = express();

mongoose
  .connect("mongodb://localhost/lojadb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Ligado à base de dados"))
  .catch(() => console.log("Erro na ligação à base de dados"));

app.use(cors());
app.use(body_parser.json());
//app.use("/");
app.use("/clientes", clientes);

app.listen(8000);
