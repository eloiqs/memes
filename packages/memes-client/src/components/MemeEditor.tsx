import { Redirect, RouteComponentProps } from '@reach/router'
import { XYCoord } from 'dnd-core'
import { TextBox } from 'memes-graph'
import React, { useState } from 'react'
import CaptionMemeMutation from '../mutations/CaptionMemeMutation'
import MemesQuery from '../queries/MemesQuery'
import { Indexed } from '../utils/types'
import { DropTargetMeme, Meme } from './Meme'

interface MemeEditorParams {
  id: string
}

const MemeEditor: React.FunctionComponent<
  RouteComponentProps<MemeEditorParams>
> = ({ id }) => {
  const [state, setState] = useState({ count: 0, captions: [] } as {
    count: number
    captions: Array<Indexed<TextBox>>
  })

  const addCaption = () => {
    const currentCount = state.count
    const newCount = currentCount + 1
    const previousCaption = state.captions.find(
      ({ index }) => index === currentCount
    )
    const newX = previousCaption ? previousCaption.x : 50
    const newY =
      previousCaption && previousCaption.y ? previousCaption.y + 20 : 20

    setState({
      count: newCount,
      captions: [
        ...state.captions,
        {
          index: newCount,
          text: '',
          x: newX,
          y: newY
        }
      ]
    })
  }

  const onCaptionTextchange = (index: number) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) =>
    setState({
      ...state,
      captions: state.captions.map(caption =>
        caption.index === index
          ? { ...caption, text: event.target.value }
          : caption
      )
    })

  const removeCaption = (index: number) =>
    setState({
      ...state,
      captions: state.captions.filter(caption => caption.index !== index)
    })

  const updateCaptionCoord = (index: number, { x, y }: XYCoord) => {
    setState({
      ...state,
      captions: state.captions.map(caption =>
        caption.index === index ? { ...caption, x, y } : caption
      )
    })
  }

  return (
    <MemesQuery>
      {({ memes }) => {
        const meme = memes.find(m => m.id === id)
        if (!meme) {
          return <Redirect noThrow={true} to="/memes" />
        }
        return (
          <div>
            <h2>Meme Editor</h2>
            <DropTargetMeme
              meme={meme}
              captions={state.captions}
              updateCaptionCoord={updateCaptionCoord}
            />
            <button data-testid="add" onClick={addCaption}>
              +
            </button>
            {state.captions.map(({ index, text }) => (
              <div key={index}>
                <input
                  data-testid={`caption-${index}-input`}
                  type="text"
                  value={text}
                  onChange={onCaptionTextchange(index)}
                />
                <button
                  data-testid={`remove-caption-${index}`}
                  onClick={() => removeCaption(index)}
                >
                  -
                </button>
              </div>
            ))}
            <CaptionMemeMutation>
              {(captionMeme, { captionMeme: response }, result) => {
                return (
                  <>
                    <button
                      data-testid="save"
                      disabled={result.loading}
                      onClick={() =>
                        captionMeme({
                          variables: {
                            data: {
                              boxes: [
                                { text: 'wow such mutation' },
                                { text: 'very meme' }
                              ],
                              templateId: meme.id
                            }
                          }
                        })
                      }
                    >
                      Save
                    </button>
                    {result.loading && <>...Loading</>}
                    {result.error && <>Error: {result.error.message}</>}
                    {response && response.url && (
                      <Meme
                        meme={{
                          url: response.url,
                          name: 'your meme',
                          id: 'some fake id',
                          width: meme.width,
                          height: meme.height
                        }}
                      />
                    )}
                  </>
                )
              }}
            </CaptionMemeMutation>
          </div>
        )
      }}
    </MemesQuery>
  )
}

export default MemeEditor
