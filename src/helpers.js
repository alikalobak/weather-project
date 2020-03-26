import moment from 'moment'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ReactComponent as ClearQuerySVG } from './resources/clear.svg'

export const renderForecast = (forecasts) => {
    return forecasts.map(forecast => {
        return (
            <div className="favorite" key={forecast.Date}>
                <span>{moment(forecast.Date).format('dddd, D/M')}</span>
                <span>{forecast.Temperature.Maximum.Value}°</span>
                <span>{forecast.Day.IconPhrase}</span>
            </div>
        )
    })
}

export const removeFromFavorites = (key) => {
    const favorites = JSON.parse(localStorage.getItem('favorites'))
        .filter(location => location.locationDetails.key !== key)

    localStorage.setItem('favorites', JSON.stringify(favorites))
}

export const addToFavorites = (location) => {
    if (!localStorage.getItem('favorites')) {
        localStorage.setItem('favorites', JSON.stringify([location]))
    } else {
        const favorites = JSON.parse(localStorage.getItem('favorites'))
        favorites.push(location)

        localStorage.setItem('favorites', JSON.stringify(favorites))
    }
}

export const renderFavoritesButton = (location, isFavorited, setIsFavorited) => {
    console.log(isFavorited)
    if (isFavorited) {
        return <button onClick={() => {
            removeFromFavorites(location.locationDetails.key)
            setIsFavorited(false)
        }}>Remove from favorites</button>
    }
    return <button onClick={() => {
        addToFavorites(location)
        setIsFavorited(true)
    }}>Add to favorites</button>

}

export const removeFromFavoritesPage = (name, setFavorites) => {
    const favorites = JSON.parse(localStorage.getItem('favorites'))
        .filter(favorite => favorite.locationDetails.locationName !== name)
    localStorage.setItem('favorites', JSON.stringify(favorites))
    setFavorites(favorites)
}

export const renderFavorites = (favorites, setFavorites) => {
    return favorites.map(favorite => {
        return (
            <div className="favorite" key={favorite.locationDetails.locationKey}>
                <div>
                    {favorite.locationDetails.locationName}
                </div>
                {favorite.forecasts.dailyForecasts[0].Temperature.Maximum.Value}°
                    <button onClick={() => removeFromFavoritesPage(favorite.locationDetails.locationName, setFavorites)}>
                    Remove
                    </button>
            </div>
        )
    })
}

export const renderClearSearch = (query, setInputValue, setSuggestions) => {
    if (query) {
        return (
            <ClearQuerySVG className="clear-search" onClick={() => {
                setInputValue('')
                setSuggestions([])
            }} />
        )
    }
}

export const fetchSearchSuggestions = async (query, setSuggestions) => {
    try {
        const response = await axios.get('http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=P325o4iUPsOKEA6GV2byFNsBRqEWh25I&q=' + query)
        setSuggestions(response.data)
    } catch (e) {
        console.log('Network error. Please check your connection and try again.')
    }
}

export const handleSearchInput = (e, setSuggestions, setUserInput) => {
    const userInput = e.target.value

    setUserInput(userInput)

    if (userInput.length < 2) {
        setSuggestions([])
    } else {
        fetchSearchSuggestions(userInput, setSuggestions)
    }
}

export const renderSearchSuggestions = (suggestions, setSuggestions, setUserInput, handleSetSelection) => {
    if (!suggestions.length) return null
    return (
        <ul>
            {suggestions.map(suggestion => {
                return (
                    <li
                        key={suggestion.Key}
                        onClick={() => {
                            setUserInput(suggestion.LocalizedName)
                            setSuggestions([])
                            handleSetSelection(suggestion)
                            console.log('suggestions')
                            console.log(suggestion)
                        }}>
                        {suggestion.LocalizedName}
                    </li>
                )
            })}
        </ul>
    )
}

export const useInitialForecast = () => {
    const locationCode = '215854'
    const [locationDetails, setLocationDetails] = useState({})
    const [forecasts, setForecasts] = useState({})

    useEffect(() => {
        axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationCode}?apikey=XmwZ0Xg7fBum5BgGI09qAA9EmvG7D755&metric=true`)
            .then(res => {
                const headline = res.data.Headline
                const dailyForecasts = res.data.DailyForecasts
                setForecasts({ headline, dailyForecasts })
            }).catch(e => console.log(e))
        axios.get(`http://dataservice.accuweather.com/locations/v1/${locationCode}?apikey=XmwZ0Xg7fBum5BgGI09qAA9EmvG7D755&metric=true`).
            then(res => {
                const locationName = res.data.EnglishName
                const localizedName = res.data.LocalizedName
                const locationKey = res.data.Key
                setLocationDetails({ locationName, localizedName, locationKey })
            }).catch(e => console.log(e))
    }, [])

    return { locationDetails, forecasts }
}

export const fetchForecasts = async (location) => {
    const forecasts = {}
    const locationDetails = {}
    try {
        const res = await axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${location.Key}?apikey=XmwZ0Xg7fBum5BgGI09qAA9EmvG7D755&metric=true`)
        forecasts.headline = res.data.Headline
        forecasts.dailyForecasts = res.data.DailyForecasts
        locationDetails.locationName = location.LocalizedName
        locationDetails.locationKey = location.Key
        console.log('fetchForecasts')
        console.log({ forecasts, locationDetails })
        return { forecasts, locationDetails }
    } catch (e) {
        console.log(e)
    }
}