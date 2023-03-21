import React from 'react'
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client"
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { App } from './components/App/App'
import './index.css'

const cache = new InMemoryCache()

const client = new ApolloClient({
  cache: cache,
  uri: "https://board-together.herokuapp.com/graphql"
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <GoogleOAuthProvider clientId={process.env.REACT_APP_API_KEY}>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </GoogleOAuthProvider>
);

