import React, { useState, useEffect} from 'react'
import { renderForecast, renderFavoritesButton } from '../helpers'

const LocationInfo = ({ location }) => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites'))
    const [isFavorited, setIsFavorited] = useState(null)
    
    useEffect(() => {
        if (savedFavorites && savedFavorites.length) {
            console.log(savedFavorites)
            console.log(location.locationDetails.locationKey)
                for (let i = 0; i < savedFavorites.length; i++) {
                    if (savedFavorites[i].locationDetails.locationKey === location.locationDetails.locationKey) {
                        setIsFavorited(true)
                    } else {
                        setIsFavorited(null)
                    }
                }
            }
    }, [location.locationDetails.locationKey])

    if (!location.forecasts.dailyForecasts || !location.locationDetails.locationName) return 'Loading...'
    return(
        <div className="location-info">
            <div className="location-info-header">
                    <div>
                        {location.locationDetails.locationName}
                        <br/>
                        <span>{location.forecasts.dailyForecasts[0].Temperature.Maximum.Value}°</span>
                    </div>
                    <div>
                        {renderFavoritesButton(location, isFavorited, setIsFavorited)}
                    </div>
            </div>
            <div className="location-info-body">
                {location.forecasts.dailyForecasts[0].Day.IconPhrase}
            </div>
            <div className="location-info-footer">
            {renderForecast(location.forecasts.dailyForecasts)}
            </div>
        </div>
    )
}

export default LocationInfo

