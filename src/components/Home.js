import React, { useState } from 'react'
import { fetchForecasts, useInitialForecast } from '../helpers'
import AutoComplete from './AutoComplete'
import LocationInfo from './LocationInfo'

const Home = () => {
    const initialLocation = useInitialForecast()
    const [location, setLocation] = useState({ forecasts: {} })

    const handleSetSelection = async (selection) => {
        const locationObject = await fetchForecasts(selection)

        setLocation(locationObject)
    }
    if (!location) return <div className="page">Enter a location to see a forecast!</div>
    return(
        <div className="page">
            <div className="search">
                <AutoComplete handleSetSelection={handleSetSelection}/>
            </div>

            <div className="content">
                <LocationInfo location={(location.forecasts || {}).dailyForecasts ? location : initialLocation}/>
            </div>
        </div>
    )
}

export default Home