import { gql } from "@apollo/client";

export const GET_USERS = gql`## can give any name not necessarily GET_USERS
  query getAllUsers {# can give any name not necessarily getAllUsers
    users {# this name must be same as defined at the server
      username
      name
      gender
      password
    }
  }
`;

export const GET_SINGLE_USER_DETAILS_AND_TRANSACTIONS = gql`
  query getUserAndTransaction($userId: ID!) {
    singleUser(userID: $userId) {
      _id
      username
      name
      gender
      transactions {
        userId
        amount
      }
    }
  }
`;


//flow of this GET_SINGLE_USER_DETAILS_AND_TRANSACTIONS query :


// When the server receives the query, it processes it according to the defined resolvers.
// The query requests singleUser with the provided userID.

// Resolving singleUser
// --> In the userResolver under the Query section, the "singleUser" function is called
// --> This function fetches the user from the database using the provided userID.
// -->It uses the User model to find the user with the matching _id.


// Returning the User
// --> Once the user is found, it is returned to the client.
// --> The returned user object includes the fields _id, username, name, and gender.


// Resolving the Nested Query for transactions
// --> Next, since the query requests the transactions field as well, the GraphQL server checks the User resolver for how to resolve this field
// --> Here, parent refers to the singleUser object returned previously.
// --> The transactions resolver is called, and it queries the Transaction model for all transactions that match the userId of the parent user (parent._id).


// Returning Transactions
// --> The transactions are fetched from the database and returned as an array.
// --> Each transaction object includes the userId and amount, as specified in the query.


// Sending the Response Back to the Client
// --> The final structure of the response sent back to the client would look like this:


// Summary of the Flow
// --> The client initiates a request using useQuery with the userId variable.
// --> The server receives the query and processes the singleUser resolver.
// --> The server retrieves the user data from the database.
// --> The server then resolves the nested transactions query by fetching transactions related to that user.
// --> Finally, the server sends the combined response back to the client, including user details and their associated transactions.