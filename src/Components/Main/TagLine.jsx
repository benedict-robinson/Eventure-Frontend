import React from 'react'

export default function TagLine({params, setParams}) {
    const { city, countryCode } = params
  return (
    <div>Showing Events in {city}</div>
  )
}
