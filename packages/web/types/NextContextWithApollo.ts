import { NextContext } from "next";
import { ApolloClient, NormalizedCacheObject } from "apollo-boost";

export interface NextContextWithApollo extends NextContext {
  apolloClient: ApolloClient<NormalizedCacheObject>;
}
