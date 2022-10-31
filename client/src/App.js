import React from 'react';
import './App.css';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client';
import { onError } from "@apollo/client/link/error";
import { Routes, Route } from 'react-router-dom';
import { setContext } from '@apollo/client/link/context';
import Nav from './components/Nav'
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: from([errorLink, authLink.concat(httpLink)]),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <header>
          <h1>
            <a href='/'>Work Comm</a>
          </h1>
          <Nav />
        </header>
      </div>
        <div>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
          </Routes>
        </div>
    </ApolloProvider>
  );
}

export default App;
