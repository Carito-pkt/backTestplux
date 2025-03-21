const express = require("express");
const UsuarioController = require("../controllers/usuarioController");

const router = express.Router();

router.get("/", UsuarioController.getAll);
router.get("/:id", UsuarioController.getById);
router.post("/", UsuarioController.create);
router.post("/login", UsuarioController.login);

module.exports = router;
