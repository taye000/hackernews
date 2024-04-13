import { makeExecutableSchema } from "@graphql-tools/schema";
import "graphql-import-node";
import typeDefs from "./schema.graphql";

const resolvers = {
  Query: {
    info: () => "Testing",
  },
};

export const schema = makeExecutableSchema({ typeDefs, resolvers });
