const Usuario = require("../models/usuario");

const UsuarioController = {
    getAll: async (req, res) => {
        try {
            const usuarios = await Usuario.findAll();
            res.json(usuarios);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener usuarios", error });
        }
    },

    getById: async (req, res) => {
        try {
            const usuario = await Usuario.findByPk(req.params.id);
            if (!usuario) {
                return res.status(404).json({ message: "Usuario no encontrado" });
            }
            res.json(usuario);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener usuario", error });
        }
    },

    create: async (req, res) => {
        try {
            const usuario = await Usuario.create(req.body);
            res.status(201).json(usuario);
        } catch (error) {
            res.status(500).json({ message: "Error al crear usuario", error });
        }
    },
    
    login: async (req, res) => {
        console.log("Datos recibidos en /login:", req.body); 
        const { correo, contraseña } = req.body;

        try {
            const usuario = await Usuario.findOne({ where: { correo } });

            if (!usuario) {
                return res.status(404).json({ message: "Usuario no encontrado" });
            }

            if (usuario.contraseña !== contraseña) {
                return res.status(401).json({ message: "Contraseña incorrecta" });
            }

            res.status(200).json({ message: "Inicio de sesión exitoso" });
        } catch (error) {
            res.status(500).json({ message: "Error en el servidor", error });
        }
    }
};

module.exports = UsuarioController;
