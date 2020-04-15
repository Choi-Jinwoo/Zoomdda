const schools = require('../../config/school.json');

module.exports = (schoolIdx) => {
  const schoolsIdxMap = schools.map((school) => {
    return school.INDEX;
  });

  const index = schoolsIdxMap.indexOf(Number(schoolIdx));
  if (index === -1) return null;

  return school[index];
};
