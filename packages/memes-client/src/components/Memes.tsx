import { navigate, RouteComponentProps } from '@reach/router'
import React from 'react'
import MemesQuery from '../queries/MemesQuery'
import { Meme } from './Meme'

const Memes: React.FunctionComponent<RouteComponentProps> = () => {
  return (
    <MemesQuery>
      {({ memes }) =>
        memes.map(meme => (
          <Meme
            key={meme.id}
            meme={meme}
            onMemeClick={() => navigate(`memes/${meme.id}`)}
          />
        ))
      }
    </MemesQuery>
  )
}

export default Memes
