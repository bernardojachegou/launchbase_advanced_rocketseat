const User = require('../models/User');
const { compare } = require('bcryptjs');

async function login(request, response, next) {
  const { email, password } = request.body;

  const user = await User.findOne({ where: { email } });

  if (!user) {
    return response.render('session/login', {
      user: request.body,
      error: 'Usuário não cadastrado!',
    });
  }

  const passed = await compare(password, user.password);

  if (!passed) {
    return response.render('session/login', {
      user: request.body,
      error: 'Senha incorreta, tente novamente!',
    });
  }

  request.user = user;

  next();
}
async function forgot(request, response, next) {
  const { email } = request.body;

  try {
    let user = await User.findOne({ where: { email } });

    if (!user) {
      return response.render('session/forgot-password', {
        user: request.body,
        error: 'Email não cadastrado!',
      });
    }

    request.user = user;

    next();
  } catch (error) {
    console.error(error);
  }
}
async function reset(request, response, next) {
  // search user;
  const { email, password, token, passwordRepeat } = request.body;
  let user = await User.findOne({ where: { email } });
  if (!user) {
    return response.render('session/password-reset', {
      user: request.body,
      token,
      error: 'Email não cadastrado!',
    });
  }

  // check password;
  if (password != passwordRepeat) {
    return response.render('session/password-reset', {
      user: request.body,
      token,
      error: 'As senhas não conferem!',
    });
  }

  // verify token;
  if (!token || token != user.reset_token) {
    return response.render('session/password-reset', {
      user: request.body,
      token,
      error:
        'Token inválido. Por favor, solicite uma nova recuperação de senha.',
    });
  }

  // check if token is valid;
  let now = new Date();
  now = now.setHours(now.getHours());

  if (now > user.reset_token_expires) {
    return response.render('session/password-reset', {
      user: request.body,
      error: 'Token expirado! Por favor, solocoti uma nova recuperação. ',
    });
  }

  request.user = user;

  next();
}

module.exports = {
  login,
  forgot,
  reset,
};
