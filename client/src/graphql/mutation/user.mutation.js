import { gql } from '@apollo/client';

// **GraphQL does not allow nesting a query inside a mutation.
// **GraphQL does not allow performing mutations while doing a query.
// **in GraphQL, you can execute more than one mutation in a single request
// eg: 
// mutation test($input1: CreateTransactionInput!, $input2: UpdateTransactionInput!) {

//   createTransaction(input: $input1) {
//     _id
//     amount
//   }

//   updateTransaction(input: $input2) {
//     _id
//     amount
//     description
//   }

// }

// **in GraphQL, you can execute more than one query in a single request
// eg :
// query {

//     users {
//       _id
//       username
//       name
//     }

//     transactions {
//       _id
//       amount
//       description
//     }

//   }



export const SIGN_UP = gql`# defining a GraphQL mutation called SIGN_UP
  mutation signupUser($input: SignUpInput!) { # When you call the mutation signupUser($input: SignUpInput!), you're passing an object (called input) that follows the structure defined in SignUpInput
  # $input is a variable that holds the user data.

    # mutation signupUser($x: SignUpInput!) {
    # signUp(input: $x) {
    signUp(input: $input) {# input refers to an argument that is passed to the signUp mutation. This argument holds the user data being provided by the client and to get the inputed value at the server side you need to destructure with exactly same name i.e { input } in the server side.
      # Returned Data
      _id
      username
      name
      gender
    }
  }
`;


export const LOGIN = gql`
  mutation loginUser($input: LoginInput!) {
    login(input: $input) {
      _id
      username
      name
    }
  }
`;