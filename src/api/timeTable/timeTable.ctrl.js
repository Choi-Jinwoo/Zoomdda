const models = require('../../models');
const schools = require('../../../config/school.json');
const getSchoolByIdx = require('../../lib/getSchoolByIdx');
const Joi = require('joi');
const validate = require('../../lib/validate');

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

exports.setTimeTable = async (req, res) => {
  const { access_code } = req.headers;
  const { body } = req;


  const schema = Joi.object().keys({
    school_idx: Joi.number().integer().required(),
    grade: Joi.number().integer().min(1).required(),
    room: Joi.number().integer().min(1).required(),
    day: Joi.number().min(0).max(6).required(),
    /**
     * 교시
     */

    _class: Joi.number().integer().min(1).required(),
    subject: Joi.string().required().allow(null).allow(''),
    teacher: Joi.string().required().allow(null).allow(''),
    description: Joi.string().required().allow(null).allow(''),
    video_url: Joi.string().required().allow(null).allow(''),
    classroom_url: Joi.string().required().allow(null).allow(''),
  });

  if (!validate(req, res, schema)) return;
  const school = getSchoolByIdx(body.school_idx);
  if (!school) {
    res.status(404).json({
      message: '등록되지 않은 학교',
    });
    return;
  }

  /**
   * 관리자 확인
   */
  if (school.ADMIN_CODE !== access_code) {
    console.log('권한 없음');
    res.status(403).json({
      message: '권한 없음.',
    });
    return;
  }

  // 해당 학년이 존재하는지 확인
  if (!school.CALSS_INFO[body.grade]) {
    console.log('등록되지 않은 학반');
    res.status(404).json({
      message: '등록되지 않은 학반.'
    });
    return;
  }

  // 해당 반이 존재하는지 확인
  if (school.CALSS_INFO[body.grade].indexOf(body.room) === -1) {
    console.log('등록되지 않은 학반');
    res.status(404).json({
      message: '등록되지 않은 학반.'
    });
    return;
  }

  try {
    const timeTable = await models.TimeTable.findOne({
      where: {
        school_idx: body.school_idx,
        grade: body.grade,
        room: body.room,
        day: body.day,
        _class: body._class,
      },
      raw: true,
    });

    if (timeTable) {
      const data = {
        subject: body.subject,
        teacher: body.teacher,
        description: body.description,
        video_url: body.video_url,
        classroom_url: body.classroom_url,
      };

      await models.TimeTable.update(timeTable.idx, data);
    } else {
      await models.TimeTable.create(body);
    }

    res.status(200).json({
      message: '시간표 설정 성공',
    });
  } catch (err) {
    console.log('서버 오류.', err.message);
    res.status(500).json({
      message: '서버 오류',
    });
  }
};
