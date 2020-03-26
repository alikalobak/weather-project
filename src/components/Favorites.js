import React, { useState } from 'react'
import { renderFavorites } from '../helpers'

const Favorites = () => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites'))
    const [favorites, setFavorites] = useState(savedFavorites)
    if (!favorites || !favorites.length) {
        return <div className="page">You have no favorited locations</div>
    }
    return(
        <div className="page">
            <div className="favorites">
                {renderFavorites(favorites, setFavorites)}
            </div>
            
        </div>
    )
}

export default Favorites