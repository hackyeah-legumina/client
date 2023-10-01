import { Button } from "react-aria-components"
import { Logo } from "../../assets/logo"
import { useNavigate } from "@tanstack/react-router"

const Welcome = () => {
  const navigate = useNavigate()
  return (
    <div className="welcome">
      <div className="welcome__wrapper">
        <div className="welcome__logo">
          <Logo />
        </div>
        <div className="welcome__button">
          <Button onPress={() => navigate({ to: "/" })}>START</Button>
        </div>
      </div>
    </div>
  )
}

export default Welcome
