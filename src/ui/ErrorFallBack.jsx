import Button from "./Button"

function ErrorFallBack({ error, resetErrorBoundary }) {
  return (
    <div className="h-[100vh] grid justify-center items-center">
        <div>
            <h1 className="text-center">Something went wrong 🥴</h1>
            <p>{error.message}</p>
            <Button size='reset' onClick={resetErrorBoundary}>Try again</Button>
        </div>
    </div>
  )
}

export default ErrorFallBack