import { useContext, useEffect, useRef, useState } from "react"
import { SideNavContext } from "../Root/Root"
import { useUser } from "../../hooks/useUser"
import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"
import { API_URL } from "../../config"
import { useLocalStorage } from "@uidotdev/usehooks"
import { Button, TextArea } from "react-aria-components"

export const Messages = ({
  messages,
}: {
  messages: { message: string; isAssistant: boolean }[]
}) => {
  return (
    <div className="messages">
      {messages.map((m: any) => {
        return (
          <div
            className={`messages__message ${
              m.isAssistant ? "messages__message--is-assistant" : ""
            }`}
          >
            {m.message}
          </div>
        )
      })}
    </div>
  )
}

const Chat = () => {
  const user = useUser()
  const ref = useRef<HTMLDivElement>(null)

  // @ts-ignore
  const { isExpanded, setIsExpanded } = useContext(SideNavContext)
  const [aToken, _] = useLocalStorage<null | string>("accessToken", null)

  const [messageStr, setMessageStr] = useState("")

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

  const message = useMutation({
    mutationKey: ["message"],
    mutationFn: (message: string) => {
      return axios.post(
        API_URL + "/messages",
        {
          message,
        },
        {
          headers: {
            Authorization: `Bearer ${aToken}`,
          },
        }
      )
    },
  })

  useEffect(() => {
    setIsExpanded(false)
    handleS()
  }, [])

  useEffect(() => {
    handleS()
  }, [messages.data, message.status])

  return (
    <div className="chat">
      <div className="chat__messages" ref={ref}>
        {messages.status === "success" ? (
          <Messages messages={messages.data} />
        ) : null}
      </div>
      <div className="chat__controls">
        <div>
          <TextArea
            placeholder="Napisz wiadomość..."
            onChange={(e) => setMessageStr(e.target.value)}
            value={messageStr}
            onKeyUp={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                message.mutate(messageStr, {
                  onSuccess: () => {
                    messages.refetch()
                    setMessageStr("")
                  },
                })
              }
            }}
          />
        </div>
        <div>
          <Button
            onPress={() => {
              message.mutate(messageStr, {
                onSuccess: () => {
                  messages.refetch()
                  setMessageStr("")
                },
              })
            }}
          >
            Wyślij
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Chat
