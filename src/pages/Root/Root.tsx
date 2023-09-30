import { Outlet } from "@tanstack/react-router"
import SideNav from "../../layouts/SideNav/SideNav"

import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { ToastContainer } from "react-toastify"

const Root = () => {
  return (
    <>
      <ReactQueryDevtools initialIsOpen={false} />
      <ToastContainer
        position="bottom-left"
        style={{ fontFamily: `"Inter", sans-serif` }}
      />
      <SideNav />
      <div className="root">
        Root
        <Outlet />
      </div>
    </>
  )
}

export default Root
