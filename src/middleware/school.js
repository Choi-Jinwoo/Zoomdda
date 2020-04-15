const { verifyToken } = require('../lib/token');

/**
 * 해당 클라이언트의 학교
 */
module.exports = async (req, res, next) => {
  const token = req.headers['school-token'];

  try {
    const decoded = await verifyToken(token);
    const { schoolIdx } = decoded;
    req.schoolIdx = schoolIdx;
    next();
  } catch (err) {
    switch (err.message) {
      case 'jwt must be provided':
      case 'jwt malformed':
      case 'invalid token':
      case 'invalid signature':
        res.status(401).json({
          status: 401,
          message: '토큰 인증 실패',
        });
        return;
      case 'jwt expired':
        res.status(410).json({
          status: 410,
          message: '토큰 만료',
        });
        return;
      default:
        console.log('서버 오류', err.message);
        return res.status(500).json({
          status: 500,
          message: '서버 오류',
        });
    }
  }
}
