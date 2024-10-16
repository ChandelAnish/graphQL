const transactionTypeDefs = `#graphql
    type Transaction{
        _id: ID!
        userId: ID!
        description: String!
        paymentType: String!
        category: String!
        amount: Float!
        location: String!
        date: String!
    }

    type Query {
        transactions: [Transaction!]
        singleTransaction(transactionID: ID!): Transaction
    }

    type Mutation {
        createTransaction(input: CreateTransactionInput!):Transaction!
        updateTransaction(input: UpdateTransactionInput!):Transaction!
        deleteTransaction(transactionID: ID!): Transaction!
    }

    input CreateTransactionInput{
        userId: ID!
        description: String!
        paymentType: String!
        category: String!
        amount: Float!
        location: String!
        date: String!
    }

    input UpdateTransactionInput{
        _id: ID!
        description: String
        paymentType: String
        category: String
        amount: Float
        location: String
        date: String
    }
`;

export default transactionTypeDefs