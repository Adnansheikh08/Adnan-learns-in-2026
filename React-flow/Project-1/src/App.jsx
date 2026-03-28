import React from 'react'
import WorkFlow from '../Workflow/WorkFlow'
import { ReactFlowProvider } from 'reactflow'

export default function App() {
  return (
    <div style={{padding:23}}>
      <ReactFlowProvider>
        <WorkFlow />
      </ReactFlowProvider>
    </div>
  )
}
