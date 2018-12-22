import { Meme as MemeModel, TextBox } from 'memes-graph'
import React from 'react'
import { ConnectDropTarget, DropTarget, XYCoord } from 'react-dnd'
import ItemTypes from '../dnd-types'
import { Indexed } from '../utils/types'
import Caption from './Caption'
import MemeImage from './MemeImage'

export interface MemeProps {
  meme: MemeModel
  captions?: Array<Indexed<TextBox>>
  onMemeClick?(memeId: string): void
}

export const Meme: React.FunctionComponent<MemeProps> = ({
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

interface DropTargetMemeProps {
  updateCaptionCoord(index: number, coord: XYCoord): void
}

interface CollectedDropTargetMemeProps {
  connectDropTarget: ConnectDropTarget
}

export const DropTargetMeme = DropTarget<
  MemeProps & DropTargetMemeProps,
  CollectedDropTargetMemeProps
>(
  ItemTypes.Caption,
  {
    drop(props, monitor, component) {
      if (!component) {
        return
      }
      const item = monitor.getItem()
      const delta = monitor.getDifferenceFromInitialOffset() as XYCoord
      const left = Math.round(item.x + delta.x)
      const top = Math.round(item.y + delta.y)

      props.updateCaptionCoord(item.index, { x: top, y: left })
    }
  },
  connect => ({
    connectDropTarget: connect.dropTarget()
  })
)(
  class extends React.Component<
    MemeProps & DropTargetMemeProps & CollectedDropTargetMemeProps
  > {
    public render() {
      const { connectDropTarget, ...props } = this.props
      return connectDropTarget!(
        <div>
          <Meme {...props} />
        </div>
      )
    }
  }
)
