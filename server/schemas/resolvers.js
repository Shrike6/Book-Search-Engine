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
        login: 
    }
}