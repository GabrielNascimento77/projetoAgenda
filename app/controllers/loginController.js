const Login = require('../models/loginModel');

module.exports.index = (req, res) => {
    res.render('login');
};

module.exports.login = async (req, res) => {
    try {
        const login = new Login(req.body);
        await login.login();

        if (login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(() => {
                return res.redirect(req.get('referrer') || '/login/index');
            });
            return;
        }

        req.session.user = login.user;
        req.session.save(() => {
            return res.redirect('/');
        });

        console.log(req.session.user.id);

    } catch(e) {
        console.log(e);
        return res.render('404');
    }
};

module.exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/login/index');
}