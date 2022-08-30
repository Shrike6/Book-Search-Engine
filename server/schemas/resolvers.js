const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');

const resolvers = {
  Query: {
      me: async (parent, args, context) => {
        if (context.user) {
          const userData = await User.findOne({ _id: context.user._id }).select('--password');
  
          return userData;
        }
  
        throw new AuthenticationError('Not logged in');
      },
    },

  Mutation: {
    // login
      login: async (parent, { email, password }, context) => {
        const user = await User.findOne({ email });
        if (!user) {
            throw new AuthenticationError("Incorrect username.");
        }

        const checkPW = await user.isCorrectPassword(password);
        
        if (!checkPW) {
            throw new AuthenticationError("Incorrect password.");
        }

        const token = signToken(user);

        return {token, user};
    },
    // Adds a new user
    addUser: async (parent, args) => {
      const addUser = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    saveBook: async (parent, { data }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: user._id },
          { $push: { savedBooks: body } },
          { new: true }
        );
        return updatedUser;
      };
    },
    deleteBook: async (parent, { bookId }, context) => {
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $pull: { savedBooks: { bookId } } },
        { new: true }
      );
      return updatedUser;
    },
  };
};

module.exports = resolvers;