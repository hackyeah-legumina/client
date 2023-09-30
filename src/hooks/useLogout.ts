import { useLocalStorage } from "@uidotdev/usehooks"
import { useUser } from "./useUser"
import { toast } from "react-toastify"

export const useLogout = () => {
  const [__, setAToken] = useLocalStorage<null | string>("accessToken", null)
  const [_, setRToken] = useLocalStorage<null | string>("refreshToken", null)
  const user = useUser()

  return {
    logout: () => {
      setAToken(null)
      setRToken(null)
      setTimeout(() => {
        user.refetch()
        toast.success("Logged out")
      }, 50)
    },
  }
}
