import { Meme as MemeType } from 'memes-graph'
import React from 'react'

interface MemeProps {
  onMemeClick?(memeId: string): void
  meme: MemeType
}

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
        role="img"
        src={url}
        width={Math.round(memeWidth * horizontalRatio)}
        height={Math.round(memeHeight * horizontalRatio)}
      />
    )
  }
  return (
    <img
      role="img"
      src={url}
      width={Math.round(memeWidth * verticalRatio)}
      height={Math.round(memeHeight * verticalRatio)}
    />
  )
}

export default class Meme extends React.Component<MemeProps> {
  onClick = () => {
    if (this.props.onMemeClick) {
      this.props.onMemeClick(this.props.meme.id)
    }
  }

  render() {
    const { meme } = this.props

    return (
      <div onClick={this.onClick}>
        <h3>{meme.name}</h3>
        {renderMemeImage(meme.url, meme.width, meme.height, 250, 250)}
      </div>
    )
  }
}
