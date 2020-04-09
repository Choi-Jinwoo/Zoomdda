const Joi = require('joi')

module.exports = (req, res, schema) => {
  const { body } = req;
  const validation = Joi.validate(body, schema);

  if (validation.error) {
    console.log('검증 오류', validation.error)
    res.status(400).json({
      message: '검증 오류.',
    });
    return false;
  }
  return true;
};
