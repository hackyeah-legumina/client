import { useContext, useState } from "react"
import { Button, Link } from "react-aria-components"
import Auth from "../../pages/Auth/Auth"
import { useUser } from "../../hooks/useUser"
import { useLogout } from "../../hooks/useLogout"
import { SideNavContext } from "../../pages/Root/Root"
import { useNavigate } from "@tanstack/react-router"
import { Messages } from "../../pages/Chat/Chat"
import { useQuery } from "@tanstack/react-query"
import { useLocalStorage } from "@uidotdev/usehooks"
import axios from "axios"
import { API_URL } from "../../config"
import { useRouter } from "@tanstack/react-router"

const SideNav = () => {
  // @ts-ignore
  const { isExpanded, setIsExpanded } = useContext(SideNavContext)
  const [isAuth, setIsAuth] = useState(false)
  const user = useUser()
  const navigate = useNavigate()
  const [aToken, _] = useLocalStorage<null | string>("accessToken", null)

  const handleS = () => {
    return setTimeout(() => {
      const a = document.querySelector(".messages__message:last-child")
      a?.scrollIntoView(false)
    }, 100)
  }

  const messages = useQuery({
    queryKey: ["messages"],
    queryFn: () => {
      return axios
        .get(API_URL + "/messages", {
          headers: {
            Authorization: `Bearer ${aToken}`,
          },
        })
        .then((res) => {
          handleS()
          return res.data
        })
    },
    enabled: !!user.data?.data,
  })

  const logout = useLogout()

  const router = useRouter()
  const id = router.state.matches
    .map((m) => m.id)
    .slice(-1)[0] as unknown as string

  return (
    <div className={`side-nav ${!isExpanded ? "side-nav--not-expanded" : ""}`}>
      {user.data?.data.username || !isAuth ? (
        <>
          <div className="side-nav__header">
            <div></div>
            <div>
              {!!user.data?.data ? (
                <>
                  <div>{user.data.data.name}</div>
                  <div>University</div>
                  <div>17 y.o.</div>
                </>
              ) : (
                <>
                  <div>Guest</div>
                  <div>
                    <Link onPress={() => setIsAuth(true)}>
                      Login or Register
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="side-nav__content">
            <div className="side-nav__nav">
              {[
                {
                  label: "Mój profil",
                  function: () => {
                    navigate({ to: "/" })
                  },
                },
                { label: "Rejestracja na studia" },
                { label: "Kalendarz" },
              ].map((e) => (
                <div onClick={e.function}>
                  <div></div>
                  <div>{e.label}</div>
                </div>
              ))}
            </div>
            <div className="side-nav__chat-label">Your chat:</div>
            <div className="side-nav__chat">
              <div onClick={() => navigate({ to: "/chat" })}>
                {messages.status === "success" ? (
                  <Messages messages={messages.data} />
                ) : null}
              </div>
            </div>
          </div>
          <div className="side-nav__buttons">
            {id !== "/" ? (
              <Button
                className="side-nav__profile-button button"
                onPress={() => setIsExpanded((prev: boolean) => !prev)}
              >
                Profile
              </Button>
            ) : null}
            {user.data?.data ? (
              <Button
                className="side-nav__profile-button button"
                onPress={() => logout.logout()}
              >
                Logout
              </Button>
            ) : null}
          </div>
        </>
      ) : (
        <>
          <Auth setIsAuth={setIsAuth} />
        </>
      )}
    </div>
  )
}

export default SideNav
