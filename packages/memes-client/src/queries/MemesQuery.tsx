import gql from 'graphql-tag'
import { Meme } from 'memes-graph'
import React from 'react'
import { AppQuery, ExtandedAppQuery } from './AppQuery'

export const MEMES_QUERY = gql`
  {
    memes {
      id
      name
      url
      width
      height
    }
  }
`

const MemesQuery: ExtandedAppQuery<{ memes: Meme[] }> = ({ children }) => (
  <AppQuery<{ memes: Meme[] }> query={MEMES_QUERY}>{children}</AppQuery>
)

export default MemesQuery
