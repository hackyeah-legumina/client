import React from "react"
import ReactDOM from "react-dom/client"

import {
  RouterProvider,
  Router,
  Route,
  RootRoute,
} from "@tanstack/react-router"
import Root from "./pages/Root/Root.tsx"
import Index from "./pages/Index/Index.tsx"
import "./App.scss"
import "react-toastify/dist/ReactToastify.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const rootRoute = new RootRoute({
  component: Root,
})

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Index,
})

const routeTree = rootRoute.addChildren([indexRoute])

const router = new Router({ routeTree })

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
)
