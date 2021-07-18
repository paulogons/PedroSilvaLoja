const mongoose = require("mongoose");
var express = require("express");
var router = express.Router();

const clienteSchema = new mongoose.Schema({
  nr: Number,
  nome: String,
  morada: String,
});

//Model:
const Cliente = mongoose.model("Cliente", clienteSchema);

router.get("/", async function (req, res) {
  const clientes = await Cliente.find();
  debugger;
  res.send(clientes);
});

router.get("/:id", async function (req, res) {
  debugger;
  const cliente = await Cliente.findById(req.params.id);
  if (!cliente) {
    res.status(404).send("cliente inexistente");
  }
  res.send(cliente);
});

router.post("/", async function (req, res) {
  const nr = req.body.nr;
  const nome = req.body.nome;
  const morada = req.body.morada;

  let cliente = new Cliente({
    nr: nr,
    nome: nome,
    morada: morada,
  });
  cliente = await cliente.save();

  res.send(cliente);
});

router.put("/:id", async function (req, res) {
  const cliente = await Cliente.findByIdAndUpdate(
    req.params.id,
    {
      nr: req.body.nr,
      nome: req.body.nome,
      morada: req.body.morada,
    },
    { new: true }
  );

  if (!cliente) {
    res.status(404).send("cliente inexistente");
  }

  res.send(cliente);
});

router.delete("/:id", async function (req, res) {
  const cliente = await Cliente.findByIdAndRemove(req.params.id);
  if (!cliente) {
    res.status(404).send("cliente inexistente");
  }

  res.send(cliente);
});

module.exports = router;
