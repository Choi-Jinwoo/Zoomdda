const schools = require('../../../config/school.json');
const { createToken } = require('../../lib/token');

exports.login = async (req, res) => {
  const school = Number(req.query.school);

  const schoolsIdxMap = schools.map((school) => {
    return school.INDEX;
  });

  if (schoolsIdxMap.indexOf(school) === -1) {
    console.log('등록되지 않은 학교');
    res.status(404).json({
      message: '등록되지 않은 학교.',
    });
    return;
  }

  try {
    const schoolToken = await createToken(school);
    res.status(200).json({
      message: '학교 인증 완료',
      data: {
        'school-token': schoolToken
      },
    });
  } catch (err) {
    console.log('서버 오류.', err.message);
    res.status(500).json({
      message: '서버 오류.',
    });
  }
};
