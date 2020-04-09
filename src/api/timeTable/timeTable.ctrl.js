const Joi = require('joi');
const validate = require('../../lib/validate');

exports.getTimeTable = async (req, res) => {
  const { grade, room } = req.query;

  if (isNaN(grade) || isNaN(room)) {
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
}
