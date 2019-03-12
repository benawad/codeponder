import { ApolloClient, NormalizedCacheObject } from "apollo-boost";
import { createContext } from "react";

export const GitHubApolloClientContext = createContext<
  ApolloClient<NormalizedCacheObject> | null
>(null);
