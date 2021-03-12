const User = require('../models/User');

module.exports = {
  registerForm(request, response) {
    return response.render('user/register');
  },
  async post(request, response) {
    return response.send('passed!');
  },
};
