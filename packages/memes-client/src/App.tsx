import ApolloClient from 'apollo-boost'
import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { createGlobalStyle } from 'styled-components'
import MemesQuery from './queries/MemesQuery'

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
  uri: 'http://localhost:4000'
})

function renderMemeImage(
  url: string,
  memeWidth: number,
  memeHeight: number,
  targetWidth: number,
  targetHeight: number
) {
  const horizontalRatio = targetWidth / memeWidth
  const verticalRatio = targetHeight / memeHeight
  if (horizontalRatio < verticalRatio) {
    return (
      <img
        src={url}
        width={Math.round(memeWidth * horizontalRatio)}
        height={Math.round(memeHeight * horizontalRatio)}
      />
    )
  }
  return (
    <img
      src={url}
      width={Math.round(memeWidth * verticalRatio)}
      height={Math.round(memeHeight * verticalRatio)}
    />
  )
}

export const App = () => (
  <ApolloProvider client={client}>
    <GlobalStyle />
    <MemesQuery>
      {({ memes }) =>
        memes.map(meme => (
          <div key={meme.id}>
            <h2>{meme.name}</h2>
            {renderMemeImage(meme.url, meme.width, meme.height, 250, 250)}
          </div>
        ))
      }
    </MemesQuery>
  </ApolloProvider>
)
