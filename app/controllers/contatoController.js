const Contato = require('../models/contatoModel');

module.exports.novoContato = (req, res) => {
    res.render('contato', { contato: {} });
}

module.exports.register = async (req, res) => {
    try {
        const contato = new Contato(req.body);
        await contato.register();

        if (contato.errors.length > 0) {
            req.flash('errors', contato.errors);
            req.session.save(() => res.redirect('/contato'));
            return;
        }

        req.flash('success', 'Contato registrado com sucesso!');
        req.session.save(() => res.redirect(`/contato/${contato.contato.id}`));
        return;
    } catch (e) {
        console.log(e);
        res.render('404');
    }

}

module.exports.editIndex = async (req, res) => {
    if (!req.params.id) return res.render('404');

    const contato = await Contato.buscaPorId(req.params.id);
    if (!contato) return res.render(404);

    res.render('contato', { contato });
}

module.exports.edit = async (req, res) => {
    try {
        if (!req.params.id) return res.render('404');
        const contato = new Contato(req.body);
        await contato.edit(req.params.id)

        if (contato.errors.length > 0) {
            req.flash('errors', contato.errors);
            req.session.save(() => res.redirect('/contato'));
            return;
        }

        req.flash('success', 'Contato editado com sucesso!');
        req.session.save(() => res.redirect(`/contato/${contato.contato.id}`));
        return;
    } catch (e) {
        console.log(e);
        res.render('404');
    }

}

module.exports.delete = async (req, res) => {
    if (!req.params.id) return res.render('404');

    const contato = await Contato.deleteContato(req.params.id);
    if (!contato) return res.render(404);

    req.flash('success', 'Contato excluído com sucesso!');
    req.session.save(() => res.redirect('back'));
    return;

}