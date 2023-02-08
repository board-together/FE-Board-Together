import React from 'react'
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client"
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { App } from './components/App/App'
import './index.css'

const cache = new InMemoryCache()

const client = new ApolloClient({
  cache: cache,
  uri: "https://8d01e596-f828-456f-b6c0-5dc44760ea92.mock.pstmn.io/graphql"
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>
);

