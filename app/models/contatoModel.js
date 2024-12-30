const mongoose = require('mongoose');
const validator = require('validator');

const contatoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    sobrenome: { type: String, required: false, default: '' },
    telefone: { type: String, required: false, default: '' },
    email: { type: String, required: false, default: '' },
    criadoEm: { type: Date, default: Date.now }
});

const contatoModel = mongoose.model('Contato', contatoSchema);

class Contato {
    constructor(body) {
        this.nome = body.nome;
        this.sobrenome = body.sobrenome;
        this.telefone = body.telefone;
        this.email = body.email;
        this.errors = [];
        this.contato = null;
    }

    async register() {
        this.validation();
        if(this.errors.length > 0) return;
        this.contato = await contatoModel.create({
            nome: this.nome,
            sobrenome: this.sobrenome,
            telefone: this.telefone,
            email: this.email
        });
    }

    validation() {

        if(this.email && !validator.isEmail(this.email)) this.errors.push('E-mail inválido');
        if(!this.nome) this.errors.push('O nome é obrigatório.');
        if(!this.email && !this.telefone) {
            this.errors.push('Pelo menos um contato precisa ser cadastrado: e-mail ou telefone.');
        }
    }

    static async buscaPorId(id) {
        if(typeof id !== 'string') return;
        const user = await contatoModel.findById(id);
        return user;
    }

    async edit(id) {
        if(typeof id !== 'string') return;
        this.validation();
        if(this.errors.length > 0) return;
        this.contato = await contatoModel.findByIdAndUpdate(
            id, 
            {
                nome: this.nome,
                sobrenome: this.sobrenome,
                telefone: this.telefone,
                email: this.email
            },
            { new: true});
    }

    static async buscaContatos(id) {
        const contatos = await contatoModel.find()
            .sort({ criadoEm: -1 });
        return contatos;
    }

    static async deleteContato(id) {
        if(typeof id !== 'string') return;
        const contato = await contatoModel.findOneAndDelete({ _id: id });
        return contato;
    }

}

module.exports = Contato;