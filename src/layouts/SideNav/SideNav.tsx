import { useState } from "react"
import { Button } from "react-aria-components"
import Auth from "../../pages/Auth/Auth"
import { useUser } from "../../hooks/useUser"
import { useLogout } from "../../hooks/useLogout"

const SideNav = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  const user = useUser()

  const logout = useLogout()
  return (
    <div className={`side-nav ${isExpanded ? "side-nav--not-expanded" : ""}`}>
      {user.data?.data ? (
        <>
          <div className="side-nav__header">
            <div></div>
            <div>
              <div>Jan Kot</div>
              <div>University</div>
              <div>17 y.o.</div>
            </div>
          </div>
          <div className="side-nav__content"></div>
          <div className="side-nav__buttons">
            <Button
              className="side-nav__profile-button button"
              onPress={() => setIsExpanded((prev) => !prev)}
            >
              Profile
            </Button>
            <Button
              className="side-nav__profile-button button"
              onPress={() => logout.logout()}
            >
              Logout
            </Button>
          </div>
        </>
      ) : (
        <>
          <Auth />
        </>
      )}
    </div>
  )
}

export default SideNav
