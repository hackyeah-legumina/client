import { useState } from "react"
import { Button } from "react-aria-components"

const SideNav = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  return (
    <div className={`side-nav ${isExpanded ? "side-nav--not-expanded" : ""}`}>
      <div className="side-nav__header">
        <div></div>
        <div>
          <div>Jan Kot</div>
          <div>University</div>
          <div>17 y.o.</div>
        </div>
      </div>
      <div className="side-nav__content"></div>
      <Button
        className="side-nav__profile-button button"
        onPress={() => setIsExpanded((prev) => !prev)}
      >
        Profile
      </Button>
    </div>
  )
}

export default SideNav
