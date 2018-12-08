import { NetworkStatus } from 'apollo-boost'
import React, { ReactNode } from 'react'
import { Query, QueryProps, QueryResult } from 'react-apollo'
import { Omit } from '../utils/types'

export interface AppQueryProps<Data, Variables> {
  children: (data: Data, result: QueryResult<Data, Variables>) => ReactNode
  renderNetworkStatus?: (
    networkStatus: NetworkStatus,
    result: QueryResult<Data, Variables>
  ) => ReactNode
  renderError?: (
    error: Error,
    result: QueryResult<Data, Variables>
  ) => ReactNode
  renderNoData?: (result: QueryResult<Data, Variables>) => ReactNode
}

export class AppQuery<Data = null, Variables = null> extends React.Component<
  Omit<QueryProps<Data, Variables>, 'children'> & AppQueryProps<Data, Variables>
> {
  defaultRenderNetworkStatus(networkStatus: NetworkStatus) {
    if (networkStatus === NetworkStatus.loading) {
      return <>...Loading</>
    }
    return null
  }

  defaultRenderError(_error: Error, result: QueryResult<Data, Variables>) {
    if (!result.data) {
      return <>Error</>
    }
    return null
  }

  defaultRenderNoData() {
    return <>No Date</>
  }

  render() {
    const {
      children,
      renderNetworkStatus,
      renderError,
      renderNoData,
      ...queryProps
    } = this.props

    return (
      <Query<Data, Variables> {...queryProps}>
        {(result: QueryResult<Data, Variables>) => {
          const networkStatusNode = (renderNetworkStatus ||
            this.defaultRenderNetworkStatus)(result!.networkStatus, result)
          if (networkStatusNode) {
            return networkStatusNode
          }
          const errorNode = result.error
            ? (renderError || this.defaultRenderError)(result!.error!, result)
            : undefined
          if (errorNode) {
            return errorNode
          }
          const noDataNode = !result.data
            ? (renderNoData || this.defaultRenderNoData)(result)
            : undefined
          if (noDataNode) {
            return noDataNode
          }
          return children(result.data!, result)
        }}
      </Query>
    )
  }
}

export type ExtandedAppQuery<
  Data = null,
  Variables = null
> = React.FunctionComponent<AppQueryProps<Data, Variables>>
