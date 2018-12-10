import { Redirect, RouteComponentProps } from '@reach/router'
import { Meme as MemeType } from 'memes-graph'
import React from 'react'
import { MutationFn } from 'react-apollo'
import CaptionMemeMutation, {
  CaptionMemeData,
  CaptionMemeVariables
} from '../mutations/CaptionMemeMutation'
import MemesQuery from '../queries/MemesQuery'
import Meme from './Meme'

interface MemeEditorParams {
  id: string
}

function onClick(
  captionMeme: MutationFn<CaptionMemeData, CaptionMemeVariables>,
  meme: MemeType
) {
  return () =>
    captionMeme({
      variables: {
        data: {
          boxes: [{ text: 'wow such mutation' }, { text: 'very meme' }],
          templateId: meme.id
        }
      }
    })
}

const MemeEditor: React.FunctionComponent<
  RouteComponentProps<MemeEditorParams>
> = ({ id }) => (
  <MemesQuery>
    {({ memes }) => {
      const meme = memes.find(m => m.id === id)
      if (!meme) {
        return <Redirect noThrow={true} to="/memes" />
      }
      return (
        <div>
          <h2>Meme Editor</h2>
          <Meme meme={meme} />
          <CaptionMemeMutation>
            {(captionMeme, { captionMeme: response }, result) => {
              return (
                <>
                  <button
                    disabled={result.loading}
                    role="button"
                    onClick={onClick(captionMeme, meme)}
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

export default MemeEditor
