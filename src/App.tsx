import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import "./App.scss"

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <>test</>
    </QueryClientProvider>
  )
}

export default App
