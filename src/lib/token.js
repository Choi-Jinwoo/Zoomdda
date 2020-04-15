require('dotenv').config();
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

exports.createToken = async (schoolIdx) => {
  const payload = {
    schoolIdx,
  };

  const option = {
    expiresIn: '365d',
  };

  return jwt.sign(payload, JWT_SECRET, option);
};

exports.verifyToken = (token) => jwt.verify(token, JWT_SECRET);
