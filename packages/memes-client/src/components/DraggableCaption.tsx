import React, { useEffect } from 'react'
import {
  DragElementWrapper,
  DragPreviewOptions,
  DragSource,
  DragSourceOptions
} from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'
import ItemTypes from '../dnd-types'
import { Caption, CaptionProps } from './styled'

interface DraggableCaptionProps {
  index: number
}

interface CollectedDraggableCaptionProps {
  connectDragSource: DragElementWrapper<DragSourceOptions>
  connectDragPreview: DragElementWrapper<DragPreviewOptions>
  isDragging: boolean
}

const DraggableCaption: React.FunctionComponent<
  CaptionProps & DraggableCaptionProps & CollectedDraggableCaptionProps
> = ({
  index,
  x,
  y,
  children,
  connectDragSource,
  connectDragPreview,
  isDragging
}) => {
  useEffect(() => {
    connectDragPreview(getEmptyImage(), { captureDraggingState: true })
  }, [])

  return connectDragSource(
    <div style={{ opacity: isDragging ? 0 : 1 }}>
      <Caption data-testid={`caption-${index}`} y={y} x={x}>
        {children}
      </Caption>
    </div>
  )
}

export interface DraggableCaptionData {
  index: number
  x: number
  y: number
  text: string
}

export default DragSource<
  CaptionProps & DraggableCaptionProps,
  CollectedDraggableCaptionProps,
  DraggableCaptionData
>(
  ItemTypes.Caption,
  {
    beginDrag: ({ index, x = 0, y = 0, children }) => ({
      index,
      x,
      y,
      text: children
    })
  },
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  })
)(DraggableCaption)
