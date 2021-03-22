module.exports = {
  loginForm(request, response) {
    return response.render('Session/index.njk');
  },
  logout(request, response) {
    request.session.destroy();
    return response.redirect('/');
  },
};
