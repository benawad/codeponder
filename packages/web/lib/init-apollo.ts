import {
  ApolloClient,
  ApolloReducerConfig,
  InMemoryCache,
  NormalizedCacheObject,
} from "apollo-boost";
import { setContext } from "apollo-link-context";
import { createHttpLink, HttpLink } from "apollo-link-http";
import fetch from "isomorphic-unfetch";
import { isBrowser } from "./isBrowser";

const apolloMap: { [key: string]: ApolloClient<NormalizedCacheObject> } = {};

interface ApolloServer extends NodeJS.Global {
  fetch: typeof fetch;
}

// Polyfill fetch() on the server (used by apollo-client)
if (!isBrowser) {
  (global as ApolloServer).fetch = fetch;
}

function create(
  linkOptions: HttpLink.Options,
  initialState: NormalizedCacheObject,
  { getToken }: { getToken: () => string },
  cacheConfig: ApolloReducerConfig = {}
): ApolloClient<NormalizedCacheObject> {
  const httpLink = createHttpLink(linkOptions);

  const authLink = setContext((_, { headers }) => {
    const token = getToken();
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser, // Disables forceFetch on the server (so queries are only run once)
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(cacheConfig).restore(initialState || {}),
  });
}

export default function initApollo(
  linkOptions: HttpLink.Options,
  initialState: NormalizedCacheObject,
  options: { getToken: () => string },
  cacheConfig: ApolloReducerConfig = {}
): ApolloClient<NormalizedCacheObject> {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!isBrowser) {
    return create(linkOptions, initialState, options, cacheConfig);
  }

  // Reuse client on the client-side
  if (!apolloMap[linkOptions.uri as string]) {
    apolloMap[linkOptions.uri as string] = create(
      linkOptions,
      initialState,
      options,
      cacheConfig
    );
  }

  return apolloMap[linkOptions.uri as string];
}
