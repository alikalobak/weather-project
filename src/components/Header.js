import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <header>
            <div>
                Alika
            </div>
            <div>
                <Link to="/">
                    Home
                </Link>
                <Link to="/favorites">
                    Favorites
                </Link>
            </div>
        </header>
    )
}

export default Header