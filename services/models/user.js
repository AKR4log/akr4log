const users = (db, DataTypes, options) => {
    const { paranoid, ...other } = options;
    const model = db.define(
      "users",
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        telegram_id: { type: DataTypes.STRING, unique: true },
        phone: { type: DataTypes.STRING, unique: true },
        role: { type: DataTypes.STRING, defaultValue: "USER" },
      },
      { ...other, paranoid: false, timestamps: false }
    );
    model.associate = function (models) {};
  
    return model;
  };
  
  module.exports = users;
  