import User from "../model/user.model.js";
import Transaction from "../model/transaction.model.js";

// Arguments of the Resolver Function

// A resolver function in GraphQL generally takes four arguments:

// (1) parent (or root):

// This is the result of the previous resolver in the chain, often called parent or root. If the field is at the top level (like in this case for signUp), this argument is generally unused, and a common practice is to name it _ to indicate it is not needed.

// (2) args (arguments):

// This is an object containing the arguments passed to the field in the GraphQL query or mutation. For example, in your signUp mutation, args would be { input: { username: "john", password: "1234", name: "John Doe", gender: "male" } }.
// You're destructuring the args object into { input } to directly access the input argument.

// (3) context:

// This is an object that is shared across all resolvers in the GraphQL operation. It is typically used to pass information like authentication tokens, user info, or database connections. You defined it in expressMiddleware as:
// js

// (4) info:

// This contains information about the execution state of the query, such as the field name, path to the field, and more. It's generally used in advanced cases where you need more control over the query execution process.

const userResolver = { //This section defines how to resolve fields on the Query type.
  Query: {
    users: async () => {
      const allUsers = await User.find({});
      return allUsers;
    },
    singleUser: async (_, { userID }) => {
      //the first argument is parent we don't use that so we put _ . The second argument is the args
      //In GraphQL, when you're working with mutations (or queries) that accept arguments, the arguments are passed as a single object i.e like { userID }
      const singleUser = await User.findOne({ _id: userID });
      console.log(singleUser);
      return singleUser;
    },
  },

  Mutation: { //This section defines how to resolve fields on the Mutation type.
    signUp: async (_, { input }, context) => {
      // input passed from the client, context that were passed from the expressMiddleware
      const newUser = await User.create(input);
      console.log(newUser);
      return newUser;
    },
  },

  User:{ //This section defines how to resolve fields on the User type.
    transactions: async(parent)=>{
      const allSingleUserTransactions = await Transaction.find({userId: parent._id})
      return allSingleUserTransactions
    }
  }
};

export default userResolver;
