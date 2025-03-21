const Usuario = require("../models/usuario");

const UsuarioRepository = {
    
    async getUserById(id) {
        return await Usuario.findByPk(id);
    },

    async createUser(data) {
        return await Usuario.create(data);
    },

};

module.exports = UsuarioRepository;
