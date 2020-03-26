import React from 'react'
import { Router, Route } from 'react-router-dom'
import history from '../history'
import Home from './Home'
import Header from './Header'
import Favorites from './Favorites'

const App = () => {
    return(
        <div>

            <Router history={history}>
                <Header/>
                <Route path="/" exact component={Home}/>
                <Route path="/favorites" exact component={Favorites}/>
            </Router>

        </div>
    )
}

export default App