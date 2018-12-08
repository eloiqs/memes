import ApolloClient from 'apollo-boost'
import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    }

    code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
        monospace;
    }
`
const client = new ApolloClient({
  uri: 'https://w5xlvm3vzz.lp.gql.zone/graphql'
})

export const App = () => (
  <ApolloProvider client={client}>
    <GlobalStyle />
    App
  </ApolloProvider>
)
