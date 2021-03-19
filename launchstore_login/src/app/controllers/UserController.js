const User = require('../models/User');
const { formatCep, formatCpfCnpj } = require('../../lib/utils');

module.exports = {
  registerForm(request, response) {
    return response.render('user/register');
  },
  async show(request, response) {
    const { userId: id } = request.session;
    const user = await User.findOne({ where: { id } });

    if (!user) {
      return response.render('user/register', {
        error: 'Usuário não encontrado',
      });
    }

    user.cpf_cnpj = formatCpfCnpj(user.cpf_cnpj);
    user.cep = formatCep(user.cep);

    return response.render('user/index', { user });
  },
  async post(request, response) {
    const userId = await User.create(request.body);
    request.session.userId = userId;
    return response.redirect('/users');
  },
};
