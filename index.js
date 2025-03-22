const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");
const Usuario = require("./models/usuario");
const usuarioRoutes = require("./routes/usuarioRoutes");
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

app.use("/usuarios", usuarioRoutes);

const auth = {
    username: '8b1dnmmmTy2DqkSJMnZTF0zkY2', 
    password: 'BClsmrXgdZUQOAuJv1OWAN8qsuqw0CB3SFefMvniooPXr3p4' 
  };

app.post('/api/transaction', async (req, res) => {
  const { montoCero, monto12, whatsapp, descripcion, ci, direccion, nombrePago, emailPago, telefono } = req.body;

  if (!montoCero || !monto12 || !whatsapp || !descripcion || !ci || !direccion || !nombrePago || !emailPago || !telefono) {
    return res.status(400).json({ status: 'error', message: 'Faltan parámetros en la solicitud' });
  }

  const body = {
    montoCero,
    monto12,
    whatsapp,
    descripcion,
    ci,
    direccion,
    nombrePago,
    emailPago,
    telefono
  };


  try {
    const response = await axios.post('https://apipre.pagoplux.com/intv1/integrations/createTransactionWhatsappResource', body, {
      auth: auth
    });
    res.json({
      status: 'success',
      data: response.data
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
  });
  
  app.get('/api/transactionconsumptionCode', async (req, res) => {
  const { consumptionCode,idEstablishment} = req.body;
  if (!consumptionCode || !idEstablishment ) {
    return res.status(400).json({ status: 'error', message: 'Faltan parámetros en la solicitud' });
  }
  try {
    const response = await axios.get('https://apipre.pagoplux.com/intv1/integrations/getTransactionByIdStateResource?consumptionCode='+consumptionCode+'&idEstablishment='+idEstablishment, {
      auth: auth
    });
    res.json({
      status: 'success',
      data: response.data
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
  });



  app.get('/api/transactionlink', async (req, res) => {
  const { idtransaccion } = req.body;
  if (!idtransaccion ) {
    return res.status(400).json({ status: 'error', message: 'Faltan parámetros en la solicitud' });
  }
  try {
    const response = await axios.get('https://apipre.pagoplux.com/intv1/integrations/getTransactionByIdStateResource?idTransaction='+idtransaccion, {
      auth: auth
    });
    res.json({
      status: 'success',
      data: response.data
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
  });



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