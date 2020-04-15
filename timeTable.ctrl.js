require('dotenv').config();

const Joi = require('joi');
const fs = require('fs');
const path = require('path');
const validate = require('../../lib/validate');
const DayEnum = require('../../enum/DayEnum');

exports.getTimeTable = async (req, res) => {
  const { grade, room } = req.query;

  if (isNaN(grade) || isNaN(room) || grade > 3 || grade < 1 || room > 3 || room < 1) {
    console.log('검증 오류', 'grade, room is nan');
    res.status(400).json({
      message: '검증 오류',
    });
    return;
  }


  const fileName = `${grade}-${room}.json`
  const fileData = require(`../../../data/${fileName}`)

  res.status(200).json({
    message: '조회 성공.',
    data: {
      "time_table": fileData
    }
  });
};

exports.setTimeTable = async (req, res) => {
  const { access_code } = req.headers
  const { body } = req;

  if (access_code !== process.env.ACCESS_CODE) {
    res.status(401).json({
      message: '인증 되지 않음',
    });
    return;
  }

  const schema = Joi.object().keys({
    grade: Joi.number().integer().min(1).max(3).required(),
    room: Joi.number().integer().min(1).max(3).required(),
    day: Joi.string().required(),
    /**
     * 교시
     */
    _class: Joi.number().integer().min(0).max(6).required(),
    subject: Joi.string().required().allow(null),
    teacher: Joi.string().required().allow(null),
    description: Joi.string().required().allow(null),
    zoom_id: Joi.string().required().allow(null),
    classroom: Joi.string().required().allow(null),
  });

  // Validate
  if (!validate(req, res, schema)) return;
  if (DayEnum.indexOf(body.day) === -1) {
    res.status(400).json({
      message: '검증 오류.',
    });
    return;
  }

  const fileName = `${body.grade}-${body.room}.json`
  const fileData = require(`../../../data/${fileName}`)

  fileData[body.day][body._class] = {
    SUBJECT: body.subject || "",
    TEACHER: body.teacher || "",
    CHAPTER: "",
    TOPIC: "",
    DESCRIPTION: body.description || "",
    ZOOM_ID: body.zoom_id || "",
    CLASSROOM: body.classroom || "",
  }

  try {
    await fs.writeFileSync(path.join(__dirname, `../../../data/${fileName}`), JSON.stringify(fileData));
    res.status(200).json({
      message: '시간표 변경 성공'
    })
  } catch (err) {
    console.log('서버 오류.', err.message);
    res.status(500).json({
      message: '서버 오류',
    })
  }
};
