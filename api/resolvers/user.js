const bcrypt = require("bcryptjs");

const resolvers = {
  Query: {
    async user(root, { id }, { models }) {
      return models.user.findByPk(id);
    },
    async allUsers(root, args, { models }) {
      return models.user.findAll();
    },
  },
  Mutation: {
    async createUser(root, { name, email, password }, { models }) {
      return models.user.create({
        name,
        email,
        password: await bcrypt.hash(password, 10),
      });
    },
    async deleteUser(root, { id }, { models }) {
      return models.user.destroy({
        where: {
          id,
        },
      });
    },
  },
};

module.exports = resolvers;
