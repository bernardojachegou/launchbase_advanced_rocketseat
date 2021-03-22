module.exports = {
  logout(request, response) {
    request.session.destroy();
    return response.redirect('/');
  },
};
