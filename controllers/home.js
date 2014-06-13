/**
 * GET /
 * Home page.
 */

exports.index = function(req, res) {
  res.render('home', {
    title: 'Home'
  });
};

exports.spa = function(req, res) {
  res.render('diamond/index', {
    title: 'Home'
  });
};