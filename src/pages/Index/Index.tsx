import { Input } from "react-aria-components"
import { useUser } from "../../hooks/useUser"
import { useState, useContext } from "react"
import { SideNavContext } from "../Root/Root"
import SearchPanel from "./components/SearchPanel/SearchPanel"

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
          value={string}
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
                {[
                  "jagiellonian",
                  "architecture",
                  "highschool",
                  "krakow",
                  "polish",
                  "wroclaw",
                  "primary",
                ].map((e) => {
                  return (
                    <div
                      onClick={() => {
                        setString(e)
                        setIsSearch(true)
                        setIsExpanded(false)
                      }}
                    >
                      <div className={e}></div>
                      <div>{e}</div>
                    </div>
                  )
                })}
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
