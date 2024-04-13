import { createSchema } from "graphql-yoga";

export const schema = createSchema({
  typeDefs: `
    type Query {
      info: String
    }
  `,
  resolvers: {
    Query: {
      info: () => "Testing",
    },
  },
});
