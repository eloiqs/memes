import styled from 'styled-components'

export interface BackgroundImageProps {
  src: string
  width: number
  height: number
}

export const BackgroundImage = styled.div<BackgroundImageProps>`
  display: block;
  background-image: url(${props => props.src});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  position: relative;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
`

export interface CaptionProps {
  x?: number
  y?: number
  opacity?: number
}

export const Caption = styled.div<CaptionProps>`
  position: absolute;
  cursor: move;
  top: ${props => props.y || 0 + 'px'};
  left: ${props => props.x || 0 + 'px'};
  opacity: ${props => (props.opacity === undefined ? 1 : props.opacity)}
  font-family: impact;
`
