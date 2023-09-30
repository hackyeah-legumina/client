import { Outlet } from "@tanstack/react-router"
import SideNav from "../../layouts/SideNav/SideNav"

const Root = () => {
  return (
    <>
      <SideNav />
      <div className="root">
        Root
        <Outlet />
      </div>
    </>
  )
}

export default Root
