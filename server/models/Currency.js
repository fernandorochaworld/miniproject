const { DataTypes, Model, Deferrable } = require("sequelize");
const { sequelize } = require("../config/config");
const Country = require("./Country");

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
      unique: true,
      validate: {
        notEmpty: true,
      },
      comment: "Currency code i.e: BRL, USD, CAD",
    },
    countryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
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
      type: DataTypes.FLOAT,
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
    modelName: (process.env.DB_NAME==='production'?'':'Test')+"Currency",
  }
);

Currency.belongsTo(Country, { as: 'country', foreignKey: 'countryId' });
Country.hasOne(Currency, { as: 'currency', foreignKey: 'countryId' });

module.exports = Currency;
