const User = require("../models/user.model");

const seed_table = async () => {
  const user = [
    {
      username: "kidus",
      password: 123456,
      user_role: "admin",
    },
    {
      username: "kidus2",
      password: 123456,
      user_role: "user",
    },
  ];
  try {
    // user.map(async (u) => {
    //   await User.create(u);
    // });

    const users = await User.findAll();

    users.forEach((user) => {
      console.log(
        `Id : ${user.id} \nUsername : ${user.username}, \n Password : ${user.password} \n Role ${user.user_role}`
      );
    });
  } catch (error) {
    console.log(`Error Seeding table : ${error.message}`);
  }
};

module.exports = seed_table;
