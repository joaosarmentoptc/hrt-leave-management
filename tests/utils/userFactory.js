const faker = require("faker");
const { User } = require("../../models");

const fakeUser = () => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
  name: faker.name.findName(),
});

module.exports = async function userFactory(count) {
  try {
    await Promise.all(
      Array.from({ length: count }, () => User.create(fakeUser()))
    );
  } catch (error) {
    console.error(`Error creating users in userFatory ${error.message}`);
  }
};
