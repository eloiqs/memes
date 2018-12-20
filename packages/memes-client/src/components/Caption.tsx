import { TextBox } from 'memes-graph'
import React from 'react'
import { Indexed } from '../utils/types'
import { Caption as StyledCaption } from './styled'

interface CaptionProps {
  caption: Indexed<TextBox>
}

const Caption: React.FunctionComponent<CaptionProps> = ({
  caption: { x, y, text, index }
}) => (
  <StyledCaption data-testid={`caption-${index}`} x={x} y={y}>
    {text}
  </StyledCaption>
)

export default Caption
