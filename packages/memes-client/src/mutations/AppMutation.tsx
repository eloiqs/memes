import React, { ReactNode } from 'react'
import {
  Mutation,
  MutationFn,
  MutationProps,
  MutationResult
} from 'react-apollo'
import { Omit } from '../utils/types'

export interface AppMutationProps<Data, Variables> {
  children: (
    mutateFn: MutationFn<Data, Variables>,
    data: Data,
    result: MutationResult<Data>
  ) => ReactNode
}

export default class AppMutation<
  Data = null,
  Variables = null
> extends React.Component<
  Omit<MutationProps<Data, Variables>, 'children'> &
    AppMutationProps<Data, Variables>
> {
  render() {
    const { children, ...queryProps } = this.props

    return (
      <Mutation<Data, Variables> {...queryProps}>
        {(
          mutateFn: MutationFn<Data, Variables>,
          result: MutationResult<Data>
        ) => children(mutateFn, result.data || ({} as Data), result)}
      </Mutation>
    )
  }
}

export type ExtandedAppMutation<
  Data = null,
  Variables = null
> = React.FunctionComponent<AppMutationProps<Data, Variables>>
