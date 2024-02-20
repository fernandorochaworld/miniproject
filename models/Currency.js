const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../config/config");
const Country = require("./models/Country");

class Currency extends Model {}

Currency.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      comment: "Currency primary key",
    },
    currencyCode: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      comment: "Currency code i.e: BRL, USD, CAD",
    },
    countryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      references: {
        model: Country,
        key: "id",
        deferrable: Deferrable.INITIALLY_IMMEDIATE,
      },
      comment: "References to Country",
    },
    conversionRate: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      comment: "Rate used to convertion to CAD",
    },
  },
  {
    sequelize,
    underscored: false,
    timestamps: true,
    modelName: "Currency",
  }
);

module.exports = Currency;
