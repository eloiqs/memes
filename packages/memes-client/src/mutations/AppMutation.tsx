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

type Props<Data, Variables> = Omit<MutationProps<Data, Variables>, 'children'> &
  AppMutationProps<Data, Variables>

export default class AppMutation<Data, Variables> extends React.Component<
  Props<Data, Variables>
> {
  public render() {
    const { children, ...queryProps } = this.props

    return (
      <Mutation<Data, Variables>
        {...queryProps as JSX.LibraryManagedAttributes<
          typeof Mutation,
          Props<Data, Variables>
        >}
      >
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
