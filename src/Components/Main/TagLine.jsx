import { useEffect, useState } from "react"
import { ukCities, usCities } from "../../Info/cities.js"

export default function TagLine({params, setParams, categoryName}) {
    const { city, countryCode } = params
    const [cities, setCities] = useState(ukCities)
    useEffect(() => {
        setCities(countryCode === "GB" ? ukCities : usCities)
    }, [countryCode])
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
    
      return (
        <div>
          <label htmlFor="city-select">Showing{categoryName ? ` ${categoryName}` : ""} Events in </label>
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
      );
}
