import React, { useState } from 'react'
import { handleSearchInput, renderSearchSuggestions, renderClearSearch } from '../helpers'


const AutoComplete = ({ handleSetSelection }) => {
    const [userInput, setUserInput] = useState('')
    const [suggestions, setSuggestions] = useState([])

    return(
        <div className="auto-complete">
            <input 
                type="text" 
                placeholder="Enter a location to search for"
                value={userInput} 
                onChange={(e) => handleSearchInput(e, setSuggestions, setUserInput)}
            />
            {renderClearSearch(userInput, setUserInput, setSuggestions)}
            {renderSearchSuggestions(suggestions, setSuggestions, setUserInput, handleSetSelection)}

        </div>
    )
}

export default AutoComplete