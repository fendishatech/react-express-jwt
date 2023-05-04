const seed_table = async () => {
  const user = {
    username: "kidus",
    passowrd: 123456,
    user_role: "admin",
  };
  const user2 = {
    username: "kidus2",
    passowrd: 123456,
    user_role: "user",
  };
  try {
    await User.create(user);
    await User.create(user1);
  } catch (error) {
    console.log(`Error Seeding table : ${e.message}`);
  }
};

module.exports = seed_table;
