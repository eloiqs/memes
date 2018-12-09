import { navigate, RouteComponentProps } from '@reach/router'
import React from 'react'
import MemesQuery from '../queries/MemesQuery'
import Meme from './Meme'

function onMemeClick(id: string) {
  navigate(`memes/${id}`)
}

const Memes: React.FunctionComponent<RouteComponentProps> = () => {
  return (
    <MemesQuery>
      {({ memes }) =>
        memes.map(meme => (
          <Meme key={meme.id} meme={meme} onMemeClick={onMemeClick} />
        ))
      }
    </MemesQuery>
  )
}

export default Memes
