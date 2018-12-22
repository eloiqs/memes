import React from 'react'
import { DragDropContext } from 'react-dnd'
import TestBackend from 'react-dnd-test-backend'

export function wrapInTestContext(DecoratedComponent: any): any {
  const TestStub = (props: any) => <DecoratedComponent {...props} />
  return DragDropContext(TestBackend)(TestStub)
}
