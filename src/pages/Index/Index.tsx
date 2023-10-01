import { Input } from "react-aria-components"
import { useUser } from "../../hooks/useUser"
import { useState, useContext } from "react"
import { SideNavContext } from "../Root/Root"
import SearchPanel from "./components/SearchPanel/SearchPanel"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { API_URL } from "../../config"

import jagiellonian from "../../assets/img/jagiellonian.png"
import architecture from "../../assets/img/architecture.png"
import highschool from "../../assets/img/highschool.png"
import krakow from "../../assets/img/krakow.png"
import polish from "../../assets/img/polish.png"
import primary from "../../assets/img/primary.png"
import wroclaw from "../../assets/img/wroclaw.png"

console.log(jagiellonian)

const Index = () => {
  const user = useUser()

  const [exploreType, setExploreType] = useState<
    "all" | "city" | "major" | "degree"
  >("all")

  const [isSearch, setIsSearch] = useState(false)
  // @ts-ignore
  const { isExpanded, setIsExpanded } = useContext(SideNavContext)

  const [string, setString] = useState("")

  return (
    <div className={`index ${isSearch ? "search" : ""}`}>
      <div className="index__search">
        <Input
          type="text"
          placeholder="Search..."
          onChange={(e) => {
            setIsSearch(true)
            setIsExpanded(false)
            setString(e.target.value)
          }}
        />
      </div>
      {!isSearch ? (
        <>
          <div className="index__explore">
            {/* <div>Explore schools</div> */}
            <div>
              {["all", "city", "major", "degree"].map((e) => {
                return (
                  <div
                    key={e}
                    onClick={() =>
                      setExploreType(e as "all" | "city" | "major" | "degree")
                    }
                    className={e === exploreType ? "selected" : ""}
                  >
                    <span>{e}</span>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="index__explore-items">
            {exploreType === "all" ? (
              <div className="index__explore-all">
                <div
                  className="jagiellonian"
                  style={{ backgroundImage: jagiellonian }}
                ></div>
                <div
                  className="architecture"
                  style={{ backgroundImage: architecture }}
                ></div>
                <div
                  className="highschool"
                  style={{ backgroundImage: highschool }}
                ></div>
                <div
                  className="krakow"
                  style={{ backgroundImage: krakow }}
                ></div>
                <div
                  className="polish"
                  style={{ backgroundImage: polish }}
                ></div>
                <div
                  className="wroclaw"
                  style={{ backgroundImage: wroclaw }}
                ></div>
                <div
                  className="primary"
                  style={{ backgroundImage: primary }}
                ></div>
              </div>
            ) : null}
          </div>
        </>
      ) : null}
      {isSearch ? <SearchPanel string={string} /> : null}
    </div>
  )
}

export default Index
