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
import { TanStackRouterDevtools } from "@tanstack/router-devtools"
import Chat from "./pages/Chat/Chat.tsx"

const rootRoute = new RootRoute({
  component: Root,
})

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Index,
})

const chatRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "chat",
  component: Chat,
})

const routeTree = rootRoute.addChildren([indexRoute, chatRoute])

const router = new Router({ routeTree })

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 5 * 60 * 1000,
    },
  },
})

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <TanStackRouterDevtools router={router} position="bottom-right" />
    </QueryClientProvider>
  </React.StrictMode>
)
