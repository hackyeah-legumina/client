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

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
