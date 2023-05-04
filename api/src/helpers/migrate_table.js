const User = require("../models/user.model");

const migrate_table = async () => {
  try {
    await User.sync();
  } catch (error) {
    console.log(`Error Seeding table : ${e.message}`);
  }
};

module.exports = migrate_table;
