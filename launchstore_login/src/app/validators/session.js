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

module.exports = {
  login,
  forgot,
};
