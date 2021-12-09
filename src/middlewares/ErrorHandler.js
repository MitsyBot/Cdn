const CDNError = require('../util/CDNError');

module.exports = (
  error,
  _req,
  res,
  next
) => {
  if (!error) {
    return next();
  }

  if (error instanceof CDNError) {
    return res.status(error.status).send({ message: error.message });
  }

  console.log(error.message);
  return res.status(500).send({ message: 'Ocorreu um erro ao processar sua request' });
};
