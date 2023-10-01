import { useMutation } from "@tanstack/react-query"
import { useLocalStorage } from "@uidotdev/usehooks"
import axios from "axios"
import { useState } from "react"
import { Button, Input, Label, TextField, Link } from "react-aria-components"
import { API_URL } from "../../config"
import { useUser } from "../../hooks/useUser"
import { toast } from "react-toastify"

const RegisterLink = ({
  type,
  setType,
}: {
  setType: React.Dispatch<React.SetStateAction<"login" | "register">>
  type: "login" | "register"
}) => (
  <Link
    onPress={() => setType((prev) => (prev === "login" ? "register" : "login"))}
  >
    {type === "login" ? "Want to register?" : "Want to log in?"}
  </Link>
)

const Auth = ({
  setIsAuth,
}: {
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const user = useUser()
  const [type, setType] = useState<"login" | "register">("login")
  const [__, setAToken] = useLocalStorage<null | string>("accessToken", null)
  const [_, setRToken] = useLocalStorage<null | string>("refreshToken", null)

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")

  console.log(user.data?.data)

  const registerMutation = useMutation({
    mutationKey: ["register"],
    mutationFn: () => {
      return axios.post(
        API_URL + "/auth/register",
        {
          username,
          password,
          email,
          name,
        },
        {
          withCredentials: false,
        }
      )
    },
    onSuccess: () => {
      setType("login")
      setTimeout(() => {
        user.refetch()
        toast.success("Successfully registered.")
      }, 50)
    },
  })

  const loginMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: () => {
      return axios.post(API_URL + "/auth/login", { username, password })
    },
    onSuccess: (res) => {
      setAToken(res.data.accessToken)
      setRToken(res.data.refreshToken)
      setTimeout(() => {
        user.refetch()
        setIsAuth(true)
        toast.success("Logged in!")
      }, 50)
    },
  })

  return (
    <div className="auth">
      <fieldset>
        {type === "login" ? (
          <>
            <TextField>
              <Label>Username</Label>
              <Input
                type="email"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </TextField>
            <TextField>
              <Label>Password</Label>
              <Input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </TextField>
            <Link>Forgot your password?</Link>
            <Button
              className="button"
              onPress={() => {
                loginMutation.mutate()
              }}
            >
              Login
            </Button>
            <RegisterLink setType={setType} type={type} />
          </>
        ) : type === "register" ? (
          <>
            <TextField>
              <Label>Username</Label>
              <Input
                type="email"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </TextField>
            <TextField>
              <Label>Name</Label>
              <Input
                type="text"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
              />
            </TextField>
            <TextField>
              <Label>E-mail</Label>
              <Input
                type="email"
                placeholder="E-mail"
                onChange={(e) => setEmail(e.target.value)}
              />
            </TextField>
            <TextField>
              <Label>Password</Label>
              <Input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </TextField>
            <Button
              className="button"
              onPress={() => registerMutation.mutate()}
            >
              Register
            </Button>
            <RegisterLink setType={setType} type={type} />
          </>
        ) : null}
        <Link onPress={() => setIsAuth(false)}>Continue as guest</Link>
      </fieldset>
    </div>
  )
}

export default Auth
