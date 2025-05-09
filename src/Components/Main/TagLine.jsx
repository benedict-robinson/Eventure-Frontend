import { useEffect, useState } from "react"
import { ukCities, usCities } from "../../Info/cities.js"
import "./Main.css"
import useScreenWidth from "../../Custom Hooks/useScreenWidth.jsx";

export default function TagLine({params, setParams, categoryName}) {
    const { city, countryCode } = params
    const [cities, setCities] = useState(ukCities)
    useEffect(() => {
        setCities(countryCode === "GB" ? ukCities : usCities)
    }, [countryCode])
    const screenWidth = useScreenWidth()

    const handleChangeCity = (e) => {
        const selectedCity = e.target.value;
    
        setParams({
          ...params,
          city: selectedCity,
        });
      };
      const handleChangeCountry = (e) => {
        let selectCountry = e.target.value
        if (selectCountry === "UK") {
          selectCountry = "GB"
        }
        if (params.countryCode !== selectCountry) {
          setParams({
            ...params,
            countryCode: selectCountry,
            city: selectCountry === "GB" ? "London" : "New York"
          })
        }
      }
      if (screenWidth < 558) {
        return (
          <div className="tagline-container">
            <div className="tagline-selects">
            <select style={{width: "100px"}} id="city-select" value={city} onChange={handleChangeCity}>
              {cities.map((c, i) => (
                <option key={i} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <select style={{width: "100px"}} id="country-select" value={countryCode} onChange={handleChangeCountry}>
              {["UK", "US"].map((cc, i) => (
                <option key={i} value={cc}>
                  {cc}
                </option>
              ))}
            </select>
            </div>
          </div>
        );
      }
    
      return (
        <div className="tagline-container">
          <label id="tagline-text" htmlFor="city-select">Showing{categoryName ? ` ${categoryName}` : ""} Events in </label>
          <div className="tagline-selects">
          <select style={{width: "100px"}} id="city-select" value={city} onChange={handleChangeCity}>
            {cities.map((c, i) => (
              <option key={i} value={c}>
                {c}
              </option>
            ))}
          </select>
          <select style={{width: "100px"}} id="country-select" value={countryCode} onChange={handleChangeCountry}>
            {["UK", "US"].map((cc, i) => (
              <option key={i} value={cc}>
                {cc}
              </option>
            ))}
          </select>
          </div>
        </div>
      );
}
