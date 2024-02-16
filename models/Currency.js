
module.exports = (sequelize, DataTypes) => {
  const Currency = sequelize.define("Currency", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    currencyCode: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    // countryId: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   validate: {
    //     notEmpty: true,
    //   },
    // },
    // conversionRate: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   validate: {
    //     notEmpty: true,
    //   },
    // },
  }, {});

  return Currency;
};
