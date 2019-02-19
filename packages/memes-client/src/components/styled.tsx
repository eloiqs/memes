import { XYCoord } from 'react-dnd'
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
  delta?: XYCoord | null
  x?: number
  y?: number
  children: string
}

export const Caption = styled.div.attrs<CaptionProps>(
  ({ delta }) =>
    delta !== undefined && {
      style: !delta
        ? { display: 'none' }
        : {
            transform: `translate(${delta.x}px, ${delta.y}px)`,
            WebkitTransform: `translate(${delta.x}px, ${delta.y}px)`
          }
    }
)<CaptionProps>`
  position: absolute;
  cursor: move;
  top: ${props => (props.y || 0) + 'px'};
  left: ${props => (props.x || 0) + 'px'};
  font-family: impact;
`

export const MemeDragLayer = styled.div`
  position: absolute;
  pointer-events: none;
  z-index: 100;
  width: 250px;
  height: 250px;
`
