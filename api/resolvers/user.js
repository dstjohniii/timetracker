const bcrypt = require("bcryptjs");
const authenticate = require("../auth");

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
    async login(root, { email, password }, { models }) {
      console.log(`email`, email);
      console.log(`password`, password);
      return models.user
        .findOne({ where: { email } })
        .then((user) => console.log(`user`, user) || authenticate(user));
    },
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
    async updateUser(root, { id, name, email, password }, { models }) {
      return models.user
        .update(
          { name, email, password },
          {
            where: {
              id,
            },
            returning: true,
          }
        )
        .then((data) => data?.[1]?.[0]?.dataValues);
    },
  },
};

module.exports = resolvers;
