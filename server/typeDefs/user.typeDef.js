const userTypeDef = `#graphql
    type User{
        _id:ID!
        username:String!
        password:String!
		name: String!
		profilePicture: String
		gender: String!
        transactions: [Transaction!]
    }

    type Query {
        users:[User!]
        singleUser(userID:ID!):User
    }

    type Mutation {
        signUp(input: SignUpInput!):User
        login(input: LoginInput!):User
    }

    # SignUpInput refers to a custom input type that you define in your GraphQL schema to represent the structure of the data being passed into the mutation. It is typically used to group related fields together when sending data from the client to the server

    input SignUpInput{
        username:String!
        password:String!
        name: String!
		profilePicture: String
		gender: String!
    }

    input LoginInput{
        username:String!
        password:String!
    }
`

export default userTypeDef