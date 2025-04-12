const bcrypt = require("bcryptjs");
module.exports = {
  hashPassword: (plain) => bcrypt.hash(plain, 10),
  comparePassword: (plain, hash) => bcrypt.compare(plain, hash),
};
