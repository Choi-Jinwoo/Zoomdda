module.exports = (sequelize, DataTypes) => {
  const TimeTable = sequelize.define('time-table', {
    idx: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    school_idx: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    grade: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    room: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    /**
     * 요일
     * MON(0)
     * FRI(4)
     */
    day: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    /**
     * 교시
     */
    _class: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    subject: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    teacher: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    /**
     * 실시간 스트리밍 서비스 URL
     */
    video_url: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    /**
     * Google 클래스룸 URL
     */
    classroom_url: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'time-table',
    timestamps: false,
  });

  return TimeTable;
};
