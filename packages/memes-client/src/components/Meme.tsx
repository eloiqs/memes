import { Meme as MemeModel } from 'memes-graph'
import React from 'react'
import MemeImage from './MemeImage'

export interface MemeProps {
  meme: MemeModel
}

const Meme: React.FunctionComponent<MemeProps> = ({ children, meme }) => (
  <MemeImage
    url={meme.url}
    width={meme.width}
    height={meme.height}
    targetWidth={250}
    targetHeight={250}
  >
    {children}
  </MemeImage>
)

export default Meme
