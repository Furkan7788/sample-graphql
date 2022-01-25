
const { ApolloServer } = require("apollo-server");
const { ApolloGateway } = require("@apollo/gateway");
const server = new ApolloServer({
    gateway: new ApolloGateway({
      serviceList: [
        { name: "coins", url: "http://localhost:4445/graphql" },
        { name: "transactions", url: "http://localhost:4444/graphql" }
      ]
    }),
    subscriptions: false
  });
  
  server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });




