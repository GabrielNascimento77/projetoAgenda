const { Registro } = require('../models/registroModel');

module.exports.cadastro = (req, res) => {
    res.render('cadastro');
};

module.exports.registro = async (req, res) => {

    try {
        const registro = new Registro(req.body);
        await registro.novoRegistro();

        if (registro.errors.length > 0) {
            req.flash('errors', registro.errors);
            req.session.save(() => {
                return res.redirect(req.get('referrer') || '/');
            });
            return;
        }

        req.flash('success', 'Seu usuário foi criado com sucesso.');
        req.session.save(() => {
            return res.redirect('/cadastre-se');
        });
    } catch(e) {
        console.error(e);
        return res.render('404');
    }
    

};