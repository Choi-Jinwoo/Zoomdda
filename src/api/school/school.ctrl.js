const getSchoolByIdx = require('../../lib/getSchoolByIdx');

exports.getSchool = (req, res) => {
  const { schoolIdx } = req;
  const school = getSchoolByIdx(schoolIdx);

  if (!school) {
    res.status(404).json({
      message: '등록되지 않은 학교.',
    });
    return;
  }

  res.status(200).json({
    message: '학교 정보 조회 성공.',
    data: {
      school,
    },
  });
};
