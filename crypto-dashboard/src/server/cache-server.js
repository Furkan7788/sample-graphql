const { ApolloServer, gql } = require('apollo-server');

const transactions = [];

const typeDefs = gql `

type Transaction {
    id: Int
    volume: Int
    timestamp: String
    asset_id: String
}

type Query{
    AllTransaction:[Transaction]
    TransactionById(id: Int!): Transaction
} 

input TransactionInput {
    id: Int!
    volume: String
    timestamp: String
    asset_id:String
}

type Mutation {
    Insert(payload:TransactionInput ): Transaction
}

`
const resolvers = {
    Query: {
        AllTransaction: () => {
            return transactions;
        },
        TransactionById: (root, { id }) => {
            return transactions.filter(t => {
                return t.id = id;
            })[0];
        }

    },
    Mutation: {
        Insert: (root, {payload}) => {
            transactions.push(payload);
            return payload
        }
    }
}

const houston = new ApolloServer({ typeDefs, resolvers });
houston.listen({ port: 4444 }).then(({ url }) => {
    console.log(`Houston ${url} kanalı üzerinden dinlemede`);
});