import React from 'react'
import { DragLayer, XYCoord } from 'react-dnd'
import ItemTypes from '../dnd-types'
import { DraggableCaptionData } from './DraggableCaption'
import { Caption, MemeDragLayer as StyledMemeDragLayer } from './styled'

interface CollectedMemeDragLayerProps {
  item: any
  itemType: string | symbol | null
  delta: XYCoord | null
}

function renderItem(props: CollectedMemeDragLayerProps) {
  switch (props.itemType) {
    case ItemTypes.Caption: {
      const item: DraggableCaptionData = props.item
      return (
        <Caption x={item.x} y={item.y} delta={props.delta}>
          {item.text}
        </Caption>
      )
    }
    default:
      return null
  }
}

export default DragLayer<{}, CollectedMemeDragLayerProps>(monitor => ({
  item: monitor.getItem(),
  itemType: monitor.getItemType(),
  delta: monitor.getDifferenceFromInitialOffset()
}))((props: CollectedMemeDragLayerProps) => {
  return <StyledMemeDragLayer>{renderItem(props)}</StyledMemeDragLayer>
})
