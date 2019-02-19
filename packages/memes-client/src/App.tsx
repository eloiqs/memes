import { RouteComponentProps, Router } from '@reach/router'
import React from 'react'
import { createGlobalStyle } from 'styled-components'
import MemeEditor from './components/MemeEditor'
import Memes from './components/Memes'

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

const Layout: React.FunctionComponent<RouteComponentProps> = ({ children }) => (
  <>
    <h1>App</h1>
    <main>{children}</main>
  </>
)

export const App = () => (
  <>
    <GlobalStyle />
    <Router>
      <Layout path="/">
        <Memes path="memes" default={true} />
        <MemeEditor path="memes/:id" />
      </Layout>
    </Router>
  </>
)

export default App
