const models = require('../../models');
const schools = require('../../../config/school.json');
const getSchoolByIdx = require('../../lib/getSchoolByIdx');

exports.getTimeTable = async (req, res) => {
  const { schoolIdx } = req;
  const { grade, room } = req.query;

  const school = getSchoolByIdx(schoolIdx);
  if (!school) {
    console.log('등록되지 않은 학교');
    res.status(404).json({
      message: '등록되지 않은 학교.'
    });
    return;
  }

  // 해당 학년이 존재하는지 확인
  if (!school[grade]) {
    console.log('등록되지 않은 학반');
    res.status(404).json({
      message: '등록되지 않은 학반.'
    });
    return;
  }

  // 해당 반이 존재하는지 확인
  if (school[grade].indexOf(room) === -1) {
    console.log('등록되지 않은 학반');
    res.status(404).json({
      message: '등록되지 않은 학반.'
    });
    return;
  }

};
