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
  const { queryByTestId, queryByText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemeEditor id="meme" />
    </MockedProvider>
  )
  const saveBtn = await waitForElement(() => queryByTestId('save'))
  fireEvent.click(saveBtn!)
  const editedMeme = await waitForElement(
    () => queryByText('your meme')!.parentElement
  )
  expect(editedMeme).toBeVisible()
})

it('can add, edit and remove captions', async () => {
  const { queryByTestId } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemeEditor id="meme" />
    </MockedProvider>
  )

  const addBtn = await waitForElement(() => queryByTestId('add'))
  fireEvent.click(addBtn!)
  const captionInput = await waitForElement(() =>
    queryByTestId('caption-1-input')
  )
  fireEvent.change(captionInput!, { target: { value: 'caption 1' } })
  const caption1 = await waitForElement(() => queryByTestId('caption-1'))
  expect(caption1).toBeVisible()
  expect(caption1).toHaveAttribute('x', '50')
  expect(caption1).toHaveAttribute('y', '20')

  fireEvent.change(captionInput!, { target: { value: 'caption 1 edited' } })
  expect(caption1!.textContent).toBe('caption 1 edited')

  fireEvent.click(addBtn!)
  const caption2Input = await waitForElement(() =>
    queryByTestId('caption-2-input')
  )
  fireEvent.change(caption2Input!, { target: { value: 'caption 2' } })
  const caption2 = await waitForElement(() => queryByTestId('caption-2'))
  expect(caption2).toBeVisible()
  expect(caption2).toHaveAttribute('x', '50')
  expect(caption2).toHaveAttribute('y', '40')

  const removeBtn = await waitForElement(() =>
    queryByTestId('remove-caption-1')
  )
  fireEvent.click(removeBtn!)
  expect(queryByTestId('caption-1')).toBeNull()
})

it('can drag captions around', async () => {
  const { queryByTestId } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemeEditor id="meme" />
    </MockedProvider>
  )

  const addBtn = await waitForElement(() => queryByTestId('add'))
  fireEvent.click(addBtn!)
  const captionInput = await waitForElement(() =>
    queryByTestId('caption-1-input')
  )
  fireEvent.change(captionInput!, { target: { value: 'caption 1' } })
  const caption1 = await waitForElement(() => queryByTestId('caption-1'))
  expect(caption1).toBeVisible()
  expect(caption1).toHaveAttribute('x', '50')
  expect(caption1).toHaveAttribute('y', '20')

  fireEvent(
    caption1!,
    Object.assign(new Event('dragstart', { bubbles: true }), {
      clientX: 0,
      clientY: 0,
      dataTransfer: {}
    })
  )
  fireEvent(
    caption1!,
    Object.assign(new Event('drop', { bubbles: true }), {
      clientX: 10,
      clientY: 50,
      dataTransfer: {}
    })
  )

  expect(caption1).toHaveAttribute('x', '60')
  expect(caption1).toHaveAttribute('y', '70')
})
