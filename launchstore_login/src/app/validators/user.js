const User = require('../models/User');

async function post(request, response, next) {
  const keys = Object.keys(request.body);
  for (key of keys) {
    if (request.body[key] == '') {
      return response.send('Please, fill all the fields');
    }
  }

  let { email, cpf_cnpj, password, passwordRepeat } = request.body;

  cpf_cnpj = cpf_cnpj.replace(/\D/g, '');

  const user = await User.findOne({
    where: { email },
    or: { cpf_cnpj },
  });

  if (user) {
    return response.send('User exists');
  }

  if (password != passwordRepeat) {
    return response.send('Password mismatch');
  }

  next();
}

module.exports = {
  post,
};
