import { Redirect, RouteComponentProps } from '@reach/router'
import React from 'react'
import MemesQuery from '../queries/MemesQuery'
import Meme from './Meme'

interface MemeEditorParams {
  id: string
}

const MemeEditor: React.FunctionComponent<
  RouteComponentProps<MemeEditorParams>
> = ({ id }) => (
  <MemesQuery>
    {({ memes }) => {
      const meme = memes.find(m => m.id === id)
      if (!meme) {
        return <Redirect noThrow={true} to="/memes" />
      }
      return (
        <div>
          <h2>Meme Editor</h2>
          <Meme meme={meme} />
        </div>
      )
    }}
  </MemesQuery>
)

export default MemeEditor
