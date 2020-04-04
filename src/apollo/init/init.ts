import ApolloClient from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import fetch from 'isomorphic-unfetch';
// import { setContext } from 'apollo-link-context';
// import { withClientState } from 'apollo-link-state';

const isNode = 'NODE_ENV' in process.env;

export type Client = ApolloClient<NormalizedCacheObject>;

const httpLink = new HttpLink({
  credentials: 'same-origin',
  uri: process.env.CLIENT__GRAPHQL_ENDPOINT_URL!,
  useGETForQueries: false,
  fetch,
});

export const init = (
  cacheObject: NormalizedCacheObject,
  // clientContext: ClientContext['clientContext'],
): Client => {
  const cache = new InMemoryCache().restore(cacheObject);
  // const clientState = getClientState(cache, clientContext);
  const links = [
    // withClientState(clientState),
    // makeErrorLink(cache),
    // makeLanguageLink(cache),
    httpLink,
  ];
  // if (!isNode) links.unshift(authLink);

  return new ApolloClient({
    connectToDevTools: !isNode,
    ssrMode: isNode,
    link: ApolloLink.from(links),
    cache,
  });
};
