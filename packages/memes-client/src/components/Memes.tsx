import { navigate, RouteComponentProps } from '@reach/router'
import React from 'react'
import MemesQuery from '../queries/MemesQuery'
import Meme from './Meme'

const Memes: React.FunctionComponent<RouteComponentProps> = () => (
  <MemesQuery>
    {({ memes }) =>
      memes.map(meme => (
        <div key={meme.id} onClick={() => navigate(`memes/${meme.id}`)}>
          <h3>{meme.name}</h3>
          <Meme meme={meme} />
        </div>
      ))
    }
  </MemesQuery>
)

export default Memes
