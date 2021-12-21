const bcrypt = require("bcryptjs");
const { generateJwtToken } = require("../auth");

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
      return models.user
        .findOne({
          where: { email },
        })
        .then(async (user) => {
          if (await bcrypt.compare(password, user?.password))
            return generateJwtToken(user);
          else throw new Error("invalid password");
        });
    },
    async createUser(root, { name, email, password }, { models, isAuth }) {
      if (!isAuth) throw new Error("user is not authenticated");

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
    async updateUser(root, { id, name, email, password }, { models, isAuth }) {
      if (!isAuth) throw new Error("user is not authenticated");

      return models.user
        .update(
          { name, email, password: await bcrypt.hash(password, 10) },
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
