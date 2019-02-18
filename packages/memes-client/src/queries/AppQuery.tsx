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

type Props<Data, Variables> = Omit<QueryProps<Data, Variables>, 'children'> &
  AppQueryProps<Data, Variables>

export class AppQuery<Data, Variables> extends React.Component<
  Props<Data, Variables>
> {
  public defaultRenderNetworkStatus(networkStatus: NetworkStatus) {
    if (networkStatus === NetworkStatus.loading) {
      return <>...Loading</>
    }
    return null
  }

  public defaultRenderError(
    error: Error,
    result: QueryResult<Data, Variables>
  ) {
    if (!result.data) {
      return <>Error</>
    }
    return null
  }

  public defaultRenderNoData() {
    return <>No Data</>
  }

  public render() {
    const {
      children,
      renderNetworkStatus,
      renderError,
      renderNoData,
      ...queryProps
    } = this.props

    return (
      <Query<Data, Variables>
        {...queryProps as JSX.LibraryManagedAttributes<
          typeof Query,
          Props<Data, Variables>
        >}
      >
        {(result: QueryResult<Data, Variables>) => {
          const networkStatusNode = (renderNetworkStatus ||
            this.defaultRenderNetworkStatus)(result!.networkStatus, result)
          if (networkStatusNode) {
            return networkStatusNode
          }
          const errorNode =
            result.error &&
            (renderError || this.defaultRenderError)(result.error, result)
          if (errorNode) {
            return errorNode
          }
          const noDataNode =
            !result.data && (renderNoData || this.defaultRenderNoData)(result)
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
