import React from "react";
import { render } from "react-dom";
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
// import ApolloClient from 'apollo-boost';
import { setContext } from '@apollo/client/link/context';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';

import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/style.css';
import App from "./App.jsx";

const URI = '/graphql';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log('graphQLErrors', graphQLErrors);
  }
  if (networkError) {
    console.log('networkError', networkError);
  }
});

const httpLink = createHttpLink({
  uri: URI,
  credentials: 'include',
});

const getUserId = () => JSON.parse(localStorage.getItem('userId'));

const link = ApolloLink.from([errorLink, httpLink]);

const authLink = setContext((_, { headers }) => {
  const userId = getUserId();
  return {
    headers: {
      ...headers,
      authorization: userId && userId.token ? userId.token : '',
    }
  }
});
const client = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache(),
});

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);