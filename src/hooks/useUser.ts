import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { API_URL } from "../config"
import { useLocalStorage } from "@uidotdev/usehooks"

export const useUser = () => {
  const [aToken] = useLocalStorage<null | string>("accessToken", null)

  return useQuery({
    queryKey: ["user"],
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    retry: false,
    queryFn: () => {
      aToken
      return axios.get(API_URL + "/me" + `?timestamp=${Date.now()}`, {
        headers: {
          ...(aToken !== null ? { Authorization: `Bearer ${aToken}` } : {}),
        },
      })
    },
  })
}
