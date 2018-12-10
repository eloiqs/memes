import gql from 'graphql-tag'
import { CaptionMemeInput, CaptionMemeResponse } from 'memes-graph'
import React from 'react'
import AppMutation, { ExtandedAppMutation } from './AppMutation'

export const CAPTION_MEME = gql`
  mutation CaptionMeme($data: CaptionMemeInput!) {
    captionMeme(data: $data) {
      url
      pageUrl
    }
  }
`

export type CaptionMemeData = {
  captionMeme: CaptionMemeResponse
}

export type CaptionMemeVariables = { data: CaptionMemeInput }

const CaptionMemeMutation: ExtandedAppMutation<
  CaptionMemeData,
  CaptionMemeVariables
> = ({ children }) => (
  <AppMutation<CaptionMemeData, CaptionMemeVariables> mutation={CAPTION_MEME}>
    {children}
  </AppMutation>
)

export default CaptionMemeMutation
