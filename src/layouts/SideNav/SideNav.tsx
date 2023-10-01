import { useContext, useState } from "react"
import { Button, Link } from "react-aria-components"
import Auth from "../../pages/Auth/Auth"
import { useUser } from "../../hooks/useUser"
import { useLogout } from "../../hooks/useLogout"
import { SideNavContext } from "../../pages/Root/Root"

const SideNav = () => {
  // @ts-ignore
  const { isExpanded, setIsExpanded } = useContext(SideNavContext)
  const [isAuth, setIsAuth] = useState(false)
  const user = useUser()

  const logout = useLogout()
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
          <div className="side-nav__content"></div>
          <div className="side-nav__buttons">
            <Button
              className="side-nav__profile-button button"
              onPress={() => setIsExpanded((prev: boolean) => !prev)}
            >
              Profile
            </Button>
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
