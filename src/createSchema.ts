import { makeExecutableSchema } from "graphql-tools";
import { loadResolversFiles, loadSchemaFiles } from "@graphql-modules/sonar";
import { mergeGraphQLSchemas, mergeResolvers } from "@graphql-modules/epoxy";

export const createSchema = () => {
  // console.log(loadSchemaFiles(__dirname + "/modules/"));
  return makeExecutableSchema({
    typeDefs: mergeGraphQLSchemas(loadSchemaFiles(__dirname + "/modules/")),
    resolvers: mergeResolvers(loadResolversFiles(__dirname + "/modules/"))
  });
};
