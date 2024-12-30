const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

const registroSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    sobrenome: { type: String, required: true },
    email: { type: String, required: true },
    senha: { type: String, required: true }
});

const registroModel = mongoose.model('registro', registroSchema);

class Registro {

    constructor(body) {
        this.nome = body.nome;
        this.sobrenome = body.sobrenome;
        this.email = body.email;
        this.senha = body.senha;
        this.errors = [];
    }

    validaRegistro() {

        this.cleanUp();

        //Nome e sobrenome não podem ser vazios
        if (this.nome == '' || this.sobrenome == '') {
            this.errors.push('Nome e sobrenome não podem estar vazios.')
        }

        //O e-mail precisa ser válido
        if (!validator.isEmail(this.email)) {
            this.errors.push('E-mail inválido');
        }

        //A senha precisa ter entre 6  e 50 caractéres
        if (this.senha.length < 6 || this.senha.length > 50) {
            this.errors.push('A senha precisa ter entre 6 e 50 caractéres');
        }
    }

    cleanUp() {

        if (typeof this.email !== 'string') {
            this.email = '';
        }

        if (typeof this.senha !== 'string') {
            this.senha = '';
        }
    }

    async userExists() {
        const user = await registroModel.findOne({ email: this.email });

        if (user) {
            this.errors.push('Usuário já existe!');
        }
    }

    async novoRegistro() {

        this.validaRegistro();
        if (this.errors.length > 0) return;

        await this.userExists();
        if (this.errors.length > 0) return;

        const salt = bcryptjs.genSaltSync();
        this.senha = bcryptjs.hashSync(this.senha, salt);

        //Registrando novo usuário
        await registroModel.create({
            nome: this.nome,
            sobrenome: this.sobrenome,
            email: this.email,
            senha: this.senha
        });

    }
}

module.exports = { 
    Registro,
    registroModel
};