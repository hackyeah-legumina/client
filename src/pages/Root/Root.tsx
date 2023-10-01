import { Outlet } from "@tanstack/react-router"
import SideNav from "../../layouts/SideNav/SideNav"

import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { ToastContainer } from "react-toastify"
import { createContext, useState } from "react"

export const SideNavContext = createContext<null | {
  isExpanded: boolean
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>
}>(null)

const Root = () => {
  const [isExpanded, setIsExpanded] = useState(true)
  return (
    <>
      <ReactQueryDevtools initialIsOpen={false} />
      <SideNavContext.Provider value={{ isExpanded, setIsExpanded }}>
        <ToastContainer
          position="bottom-left"
          style={{ fontFamily: `"Inter", sans-serif` }}
        />
        <SideNav />
        <div className="root">
          <Outlet />
        </div>
      </SideNavContext.Provider>
    </>
  )
}

export default Root
