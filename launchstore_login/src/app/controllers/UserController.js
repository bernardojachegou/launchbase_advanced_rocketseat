const User = require('../models/User');

module.exports = {
  registerForm(request, response) {
    return response.render('user/register');
  },
  async post(request, response) {
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

    return response.send('passed!');
  },
};
