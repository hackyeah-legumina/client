import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { API_URL } from "../../../../config"
import {
  Tabs,
  TabList,
  Tab,
  TabPanel,
  CheckboxGroup,
  Label,
  Checkbox,
} from "react-aria-components"
import { useEffect, useState } from "react"

const SearchPanel = ({ string }: { string?: string }) => {
  const [citiesArr, setCitiesArr] = useState<string[] | undefined>(undefined)
  const [typesArr, setTypesArr] = useState<string[] | undefined>(undefined)

  const search = useQuery({
    queryKey: ["search"],
    queryFn: () => {
      return axios.get(
        API_URL +
          "/universities?" +
          (typeof citiesArr !== "undefined"
            ? citiesArr?.map((c) => `filter=city:${c}`).join("&")
            : "") +
          (typeof typesArr !== "undefined"
            ? typesArr?.map((c) => `filter=type:${c}`).join("&")
            : ""),
        {
          params: {
            search: string,
          },
        }
      )
    },
  })

  // path?filter=city;krakow&filter=city;wrocław

  const cities = useQuery({
    queryFn: () => {
      return axios.get(API_URL + "/dicts/cities").then((res) => res.data)
    },
    queryKey: ["cities"],
  })

  const types = useQuery({
    queryFn: () => {
      return axios.get(API_URL + "/dicts/types").then((res) => res.data)
    },
    queryKey: ["types"],
  })

  useEffect(() => {
    search.refetch()
  }, [string, citiesArr, typesArr])

  return (
    <Tabs>
      <TabList aria-label="Search results">
        <Tab id="results">
          <span>
            Results{" "}
            {`${
              search.status === "success"
                ? search.data.data.length >= 10
                  ? "10+"
                  : search.data.data.length
                : ""
            }`}
          </span>
        </Tab>
        <Tab id="filters">
          <span>Filters</span>
        </Tab>
      </TabList>
      <TabPanel id="results">
        <div className="search-panel">
          {/* <div className="search-panel__label">Search results</div> */}
          <div className="search-panel__items">
            <div className="search-panel__items-inner">
              {search.status !== "success" ? (
                <div className="search-panel__loading">Loading...</div>
              ) : (
                search.data.data.map((e: any) => {
                  return (
                    <div className="search-panel__item">
                      <div></div>
                      <div>
                        <div>{e.institutionName}</div>
                        <div>{["Poland", e.city].join(", ")}</div>
                        <a href={e.website} target="_blank">
                          {e.website}
                        </a>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </div>
        </div>
      </TabPanel>
      <TabPanel id="filters">
        <div className="filters">
          <div>
            <CheckboxGroup
              value={citiesArr}
              onChange={(e) => {
                setCitiesArr(e)
              }}
            >
              <Label>Cities</Label>
              {cities.status === "success"
                ? cities.data.map((e: string) => {
                    return (
                      <Checkbox value={e}>
                        <div className="checkbox" aria-hidden="true">
                          <svg viewBox="0 0 18 18">
                            <polyline points="1 9 7 14 15 4" />
                          </svg>
                        </div>
                        {e}
                      </Checkbox>
                    )
                  })
                : "Loading..."}
            </CheckboxGroup>
          </div>
          <div>
            <CheckboxGroup onChange={(e) => setTypesArr(e)} value={typesArr}>
              <Label>Types</Label>
              {types.status === "success"
                ? types.data.map((e: string) => {
                    return (
                      <Checkbox value={e}>
                        <div className="checkbox" aria-hidden="true">
                          <svg viewBox="0 0 18 18">
                            <polyline points="1 9 7 14 15 4" />
                          </svg>
                        </div>
                        {e}
                      </Checkbox>
                    )
                  })
                : "Loading..."}
            </CheckboxGroup>
          </div>
        </div>
      </TabPanel>
    </Tabs>
  )
}

export default SearchPanel
