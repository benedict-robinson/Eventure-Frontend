import { useEffect, useState } from "react"
import { ukCities, usCities } from "../../Info/cities.js"

export default function TagLine({params, setParams}) {
    const { city, countryCode } = params
    const [cities, setCities] = useState(ukCities)
    useEffect(() => {
        setCities(countryCode === "GB" ? ukCities : usCities)
    }, [countryCode])
    const handleChange = (e) => {
        const selectedCity = e.target.value;
    
        setParams({
          ...params,
          city: selectedCity,
        });
      };
    
      return (
        <div>
          <label htmlFor="city-select">Showing Events in </label>
          <select style={{width: "100px"}} id="city-select" value={city} onChange={handleChange}>
            {cities.map((c, i) => (
              <option key={i} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      );
}
