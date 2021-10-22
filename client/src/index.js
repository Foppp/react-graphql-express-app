import React from "react";
import { render } from "react-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
// import ApolloClient from 'apollo-boost';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/style.css';
import App from "./App.jsx";

const client = new ApolloClient({
  uri: 'http://localhost:5000',
  cache: new InMemoryCache(),
});

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);