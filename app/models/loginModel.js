const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');
const { registroModel } = require('./registroModel');

const loginSchema = new mongoose.Schema({
    email: { type: String, required: true },
    senha: { type: String, required: true }
});

const loginModel = mongoose.models.registro;

class Login {

    constructor(body) {
        this.email = body.email;
        this.senha = body.senha;
        this.errors = [];
        this.user = null;
    }

    validation() {

        this.cleanUp();

        //O e-mail precisa ser válido
        if(!validator.isEmail(this.email)) {
            this.errors.push('E-mail inválido');
        }

        //A senha precisa ter entre 6  e 50 caractéres
        if(this.senha.length < 6 || this.senha.length > 50) {
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
    

    async login() {

        this.validation();
        if(this.errors.length > 0) return;  

        //Checa a existência do usuário
        this.user = await registroModel.findOne({ email: this.email });
        if(!this.user) {
            this.errors.push('E-mail ou senha inválida.');
            return;
        }

        //Verificação da senha
        if(!bcryptjs.compareSync(this.senha, this.user.senha)){
            console.log
            this.errors.push('Senha inválida.')
            this.user = null;
            return;
        }

    }
}

module.exports = Login;