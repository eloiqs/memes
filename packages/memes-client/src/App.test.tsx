import React from 'react'
import { MockedProvider } from 'react-apollo/test-utils'
import { fireEvent, render, waitForElement } from 'react-testing-library'
import { App } from './App'
import { MEMES_QUERY } from './queries/MemesQuery'

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
  }
]

it('renders a list of memes', async () => {
  const { queryByText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <App />
    </MockedProvider>
  )
  const meme = await waitForElement(() => queryByText('meme1')!.parentElement)
  const img = meme!.querySelector('img')
  expect(img).toHaveAttribute('src', 'some-image')
  expect(img).toHaveAttribute('width', '250')
  expect(img).toHaveAttribute('height', '250')
})

it('navigates to the meme editor when clicking a meme', async () => {
  const { queryByText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <App />
    </MockedProvider>
  )
  const meme = await waitForElement(() => queryByText('meme1')!.parentElement)
  fireEvent.click(meme!)
  const memeEditor = await waitForElement(() => queryByText('Meme Editor'))
  expect(memeEditor).toBeVisible()
})
