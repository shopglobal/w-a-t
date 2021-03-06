const conn = require('./conn');

const User = conn.define('user', {
  name: {
    type: conn.Sequelize.STRING
  },
  email: {
    type: conn.Sequelize.STRING,
    isEmail: true,
    unique: true
  },
  password: conn.Sequelize.STRING,
  googleId: conn.Sequelize.STRING,
  googleEmail: conn.Sequelize.STRING,
  facebookId: conn.Sequelize.STRING,
  facebookEmail: conn.Sequelize.STRING,
  photo: conn.Sequelize.STRING,
  lat: conn.Sequelize.FLOAT,
  long: conn.Sequelize.FLOAT,
  lastUpdate: conn.Sequelize.DATE
});

module.exports = User;
