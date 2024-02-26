const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../config/config");

class Country extends Model {}

Country.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      comment: "Country id integer",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
      comment: "Country name",
    },
  },
  {
    sequelize,
    underscored: false,
    timestamps: true,
    modelName: (process.env.NODE_ENV==='test'?'Test':'')+"Country",
  }
);

module.exports = Country;
