import { TextBox } from 'memes-graph'
import React from 'react'
import { ConnectDropTarget, DropTarget, XYCoord } from 'react-dnd'
import ItemTypes from '../dnd-types'
import { Indexed } from '../utils/types'
import { DraggableCaptionData } from './DraggableCaption'
import Meme, { MemeProps } from './Meme'

interface DropTargetableMemeProps {
  captions: Array<Indexed<TextBox>>
  updateCaptionCoord(index: number, coord: XYCoord): void
}

interface CollectedDropTargetableMemeProps {
  connectDropTarget: ConnectDropTarget
}

const DropTargetableMeme: React.FunctionComponent<
  MemeProps & DropTargetableMemeProps & CollectedDropTargetableMemeProps
> = ({ connectDropTarget, captions = [], children, ...props }) =>
  connectDropTarget(
    <div style={{ position: 'absolute' }}>
      <Meme {...props}>{children}</Meme>
    </div>
  )

export default DropTarget<
  MemeProps & DropTargetableMemeProps,
  CollectedDropTargetableMemeProps
>(
  ItemTypes.Caption,
  {
    drop(props, monitor) {
      const item = monitor.getItem() as DraggableCaptionData
      const delta = monitor.getDifferenceFromInitialOffset() as XYCoord
      const left = Math.round(item.x + delta.x)
      const top = Math.round(item.y + delta.y)

      props.updateCaptionCoord(item.index, { x: left, y: top })
    }
  },
  connect => ({
    connectDropTarget: connect.dropTarget()
  })
)(DropTargetableMeme)
