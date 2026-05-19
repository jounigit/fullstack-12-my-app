import React from 'react'
import {
  ErrorBoundary,
  //  FallbackProps
} from 'react-error-boundary'


export const QueryBoundaries = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <ErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }) => (
        <div role="alert" style={{ color: 'red' }}>
          <p>Error: {(error instanceof Error ? error.message : String(error))}</p>
          <button onClick={resetErrorBoundary}>Try again</button>
        </div>
      )}
    >
        {children}
    </ErrorBoundary>
  )
}



// Spinner
// const LoadingView = () => <div>Loading...</div>

// Error + retry
// const ErrorView = ({ error, resetErrorBoundary }: FallbackProps) => {
//   return (
//     <div>
//       <div>{error.message}</div>
//       <button title="Retry" onClick={resetErrorBoundary} />
//     </div>
//   )
// }