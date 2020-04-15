const models = require('../../models');
const schools = require('../../../config/school.json');
const getSchoolByIdx = require('../../lib/getSchoolByIdx');

exports.getTimeTable = async (req, res) => {
  const { schoolIdx } = req;
  const grade = Number(req.query.grade);
  const room = Number(req.query.room);

  const school = getSchoolByIdx(schoolIdx);
  if (!school) {
    console.log('등록되지 않은 학교');
    res.status(404).json({
      message: '등록되지 않은 학교.'
    });
    return;
  }

  // 해당 학년이 존재하는지 확인
  console.log(school.CALSS_INFO[grade])
  if (!school.CALSS_INFO[grade]) {
    console.log('등록되지 않은 학반');
    res.status(404).json({
      message: '등록되지 않은 학반.'
    });
    return;
  }

  // 해당 반이 존재하는지 확인
  if (school.CALSS_INFO[grade].indexOf(room) === -1) {
    console.log('등록되지 않은 학반');
    res.status(404).json({
      message: '등록되지 않은 학반.'
    });
    return;
  }

  try {
    const timeTable = await models.TimeTable.findAll({
      where: {
        school_idx: schoolIdx,
        grade: grade,
        room: room,
      },
      order: [
        ['day'],
        ['_class'],
      ],
      raw: true,
    });

    res.status(200).json({
      message: '시간표 조회 성공',
      data: {
        time_table: timeTable,
      },
    });
  } catch (err) {
    console.log('서버 오류.', err.message);
    res.status(500).json({
      message: '서버 오류',
    });
  }
};
