import React from 'react'
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client"
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { App } from './components/App/App'
import './index.css'

const cache = new InMemoryCache()

const client = new ApolloClient({
  cache: cache,
  uri: "https://board-together-server.herokuapp.com/graphql"
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>
);

