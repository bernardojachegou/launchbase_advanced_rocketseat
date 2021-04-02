const crypto = require('crypto');
const User = require('../models/User');
const mailer = require('../../lib/mailer');
const { hash } = require('bcryptjs');

module.exports = {
  loginForm(request, response) {
    return response.render('session/login');
  },
  login(request, response) {
    request.session.userId = request.user.id;
    return response.redirect('/users');
  },
  logout(request, response) {
    request.session.destroy();
    return response.redirect('/');
  },
  forgotForm(request, response) {
    return response.render('session/forgot-password');
  },
  async forgot(request, response) {
    const user = request.user;

    try {
      // create token;
      const token = crypto.randomBytes(20).toString('hex');

      // set expiration;
      let now = new Date();
      now = now.setHours(now.getHours() + 1);

      await User.update(user.id, {
        reset_token: token,
        reset_token_expires: now,
      });

      // send email (token);
      await mailer.sendMail({
        to: user.email,
        from: 'no-reply@launchstore.com.br',
        subject: 'Recuperação de senha',
        html: `<h2>Perdeu a chave?</h2>
      <p>Não se preocupe, clique no link abaixo para recuperar a sua senha</p>
      <p>
        <a href="http://localhost:3000/users/password-reset?token=${token}" target="_blank">
          RECUPERAR SENHA
        </a>
      </p>
      `,
      });

      // Warn about the email sending;
      return response.render('session/forgot-password', {
        success: 'Verifique seu email para resetar sua senha!',
      });
    } catch (error) {
      console.error(error);
      return response.render('session/forgot-password', {
        error: 'Aconteceu algo inesperado, tente novamente.',
      });
    }
  },
  resetForm(request, response) {
    return response.render('session/password-reset', {
      token: request.query.token,
    });
  },
  async reset(request, response) {
    const user = request.user;
    const { password, token } = request.body;

    try {
      // create new password hash;
      const newPassword = await hash(password, 8);

      // update user;
      await User.update(user.id, {
        password: newPassword,
        reset_token: '',
        reset_token_expires: '',
      });

      // show the user about the update;
      return response.render('session/login', {
        user: request.body,
        success: 'Senha atualizada! Faça o seu login!',
      });
    } catch (error) {
      console.error(error);
      return response.render('session/password-reset', {
        user: request.body,
        token,
        error: 'Aconteceu algo inesperado, tente novamente!',
      });
    }
  },
};
