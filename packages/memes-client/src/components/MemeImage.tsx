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
  const ratio =
    horizontalRatio < verticalRatio ? horizontalRatio : verticalRatio

  return (
    <BackgroundImage
      src={url}
      width={Math.round(width * ratio)}
      height={Math.round(height * ratio)}
    >
      {children}
    </BackgroundImage>
  )
}

export default MemeImage
