import 'core-js/stable/index.js'
import 'regenerator-runtime/runtime.js'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import './index.css'

import { ApolloClient, ApolloProvider, InMemoryCache, gql } from '@apollo/client'

//Create a new client object
const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
})

//Create a new query
const query = gql`
query {
    allPeople {
        name,
        phone,
        address {
            street,
            city
        }
        id
    }
}
`
//Use client object to send query to the server
client.query({ query })
  .then(response => {
    console.log(response.data)
  })

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client} >
    <App />
  </ApolloProvider>
)