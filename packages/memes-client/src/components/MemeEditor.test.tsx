import React from 'react'
import { MockedProvider } from 'react-apollo/test-utils'
import { fireEvent, render, waitForElement } from 'react-testing-library'
import { CAPTION_MEME } from '../mutations/CaptionMemeMutation'
import { MEMES_QUERY } from '../queries/MemesQuery'
import MemeEditor from './MemeEditor'

const mocks = [
  {
    request: {
      query: MEMES_QUERY
    },
    result: {
      data: {
        memes: [
          {
            id: 'meme',
            name: 'meme1',
            url: 'some-image',
            width: 500,
            height: 500
          }
        ]
      }
    }
  },
  {
    request: {
      query: CAPTION_MEME,
      variables: {
        data: {
          templateId: 'meme',
          boxes: [{ text: 'wow such mutation' }, { text: 'very meme' }]
        }
      }
    },
    result: {
      data: {
        captionMeme: {
          url: 'edited-meme-url',
          pageUrl: 'edited-meme-page-url'
        }
      }
    }
  }
]

it('can save an edited meme', async () => {
  const { queryByRole, queryByText, baseElement } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemeEditor id="meme" />
    </MockedProvider>
  )
  const saveBtn = await waitForElement(() => queryByRole('button'))
  fireEvent.click(saveBtn!)
  const editedMeme = await waitForElement(
    () => queryByText('your meme')!.parentElement
  )
  expect(editedMeme).toBeVisible()
})
