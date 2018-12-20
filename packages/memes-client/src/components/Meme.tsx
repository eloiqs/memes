import { Meme as MemeModel, TextBox } from 'memes-graph'
import React from 'react'
import { Indexed } from '../utils/types'
import Caption from './Caption'
import MemeImage from './MemeImage'

export interface MemeProps {
  meme: MemeModel
  captions?: Array<Indexed<TextBox>>
  onMemeClick?(memeId: string): void
}

const Meme: React.FunctionComponent<MemeProps> = ({
  meme,
  captions = [],
  onMemeClick
}) => (
  <div onClick={() => onMemeClick && onMemeClick(meme.id)}>
    <h3>{meme.name}</h3>
    <MemeImage
      url={meme.url}
      width={meme.width}
      height={meme.height}
      targetWidth={250}
      targetHeight={250}
    >
      {captions.map(caption => (
        <Caption key={caption.index} caption={caption} />
      ))}
    </MemeImage>
  </div>
)

export default Meme
