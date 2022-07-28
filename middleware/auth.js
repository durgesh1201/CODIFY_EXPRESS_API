module.exports = function(req, res, next) {
  if (!req.headers.auth) {
    res.status(401);
    res.send({ Error: 'Unauthorized!!!' });
    req.session.ip = req.headers['x-forwarded-for'];
    console.log(req.session.ip)
  }
  if (req.headers.auth) {
    next();
  }
};
