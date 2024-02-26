const api = require('./api');


try {
  const { sequelize } = require('./config/config');

  sequelize.sync().then(() => {
    api.listen(process.env.SERVER_PORT, () => {
      console.log(`Server running on port: ${process.env.SERVER_PORT}`);
    });
  });

  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
