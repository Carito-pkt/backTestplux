const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");
const Usuario = require("./models/usuario");
const usuarioRoutes = require("./routes/usuarioRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/usuarios", usuarioRoutes);

sequelize.sync({ force: false }).then(async () => {
    console.log("Base de datos conectada y sincronizada.");

    const count = await Usuario.count();
    if (count === 0) {
        await Usuario.bulkCreate([
            { nombre: "Juan", correo: "juan@example.com", contraseña: "123456" },
            { nombre: "Maria", correo: "maria@example.com", contraseña: "123456" },
            { nombre: "Pedro", correo: "pedro@example.com", contraseña: "123456" },
            { nombre: "Ana", correo: "ana@example.com", contraseña: "123456" },
            { nombre: "Carlos", correo: "carlos@example.com", contraseña: "123456" }
        ]);
        console.log("Usuarios de prueba creados.");
    }
});

app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});
