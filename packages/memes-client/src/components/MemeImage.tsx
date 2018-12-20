import React from 'react'
import { BackgroundImage } from './styled'

export interface MemeImageProps {
  url: string
  width: number
  height: number
  targetWidth: number
  targetHeight: number
}

const MemeImage: React.FunctionComponent<MemeImageProps> = ({
  url,
  width,
  height,
  targetWidth,
  targetHeight,
  children
}) => {
  const horizontalRatio = targetWidth / width
  const verticalRatio = targetHeight / height
  if (horizontalRatio < verticalRatio) {
    return (
      <BackgroundImage
        src={url}
        width={Math.round(width * horizontalRatio)}
        height={Math.round(height * horizontalRatio)}
      >
        {children}
      </BackgroundImage>
    )
  }
  return (
    <BackgroundImage
      src={url}
      width={Math.round(width * verticalRatio)}
      height={Math.round(height * verticalRatio)}
    >
      {children}
    </BackgroundImage>
  )
}

export default MemeImage
