import { createContext } from "react";
import { ApolloClient, NormalizedCacheObject } from "apollo-boost";

export const GitHubApolloClientContext = createContext<
  ApolloClient<NormalizedCacheObject>
>({} as any);
