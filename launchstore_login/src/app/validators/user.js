const User = require('../models/User');
const { compare } = require('bcryptjs');

function checkAllFields(body) {
  const keys = Object.keys(body);
  for (key of keys) {
    if (body[key] == '') {
      return {
        user: body,
        error: 'Por favor, preencha todos os campos!',
      };
    }
  }
}
async function show(request, response, next) {
  const { userId: id } = request.session;
  const user = await User.findOne({ where: { id } });

  if (!user) {
    return response.render('user/register', {
      error: 'Usuário não encontrado',
    });
  }

  request.user = user;

  next();
}
async function post(request, response, next) {
  const fillAllFields = checkAllFields(request.body);
  if (fillAllFields) {
    return response.render('user/register', fillAllFields);
  }

  let { email, cpf_cnpj, password, passwordRepeat } = request.body;

  cpf_cnpj = cpf_cnpj.replace(/\D/g, '');

  const user = await User.findOne({
    where: { email },
    or: { cpf_cnpj },
  });

  if (user) {
    return response.render('user/register', {
      user: request.body,
      error: 'Usuário já cadastrado!',
    });
  }

  if (password != passwordRepeat) {
    return response.render('user/register', {
      user: request.body,
      error: 'As senhas não conferem!',
    });
  }

  next();
}
async function update(request, response, next) {
  // check password;
  const { id, password } = request.body;
  if (!password) {
    return response.render('user/index', {
      user: request.body,
      error: 'Coloque sua senha para atualizar o cadastro!',
    });
  }

  // check the fields;
  const fillAllFields = checkAllFields(request.body);
  if (fillAllFields) {
    return response.render('user/index', fillAllFields);
  }

  // compare passwords;
  const user = await User.findOne({ where: { id } });
  const passed = await compare(password, user.password);
  if (!passed) {
    return response.render('user/index', {
      user: request.body,
      error: 'Senha incorreta, tente novamente!',
    });
  }

  request.user = user;

  next();
}

module.exports = {
  post,
  show,
  update,
};
