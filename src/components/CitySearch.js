/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

const CitySearch = ({ allLocations, setCurrentCity, setInfoAlert }) => {
  //hide suggestions by default unless input field is "in focus"
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  //ensure local suggestions state is updated based on changes in allLocations prop
  useEffect(() => {
    setSuggestions(allLocations);
  }, [`${allLocations}`]); //compare string representations of arrays, not memory references

  //when input changes,filter allLocations by the input value
  const handleInputChanged = (event) => {
    const value = event.target.value;
    const filteredLocations = allLocations ? allLocations.filter((location) => {
      return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
    }) : [];
    
    setQuery(value);
    setSuggestions(filteredLocations);

    let infoText;
    if (filteredLocations.length === 0) {
      infoText = 'We cannot find the city you are looking for. Please try another city';
    } else {
      infoText = '';
    }
    setInfoAlert(infoText);
  };

  const handleItemClicked = (event) => {
    const value = event.target.textContent;
    setQuery(value);
    setShowSuggestions(false); //hide suggestions list
    setCurrentCity(value);
    setInfoAlert('');
  };

  return (
    <div id='city-search'>
      <input
        type='text'
        className='city'
        placeholder='Search for a city'
        value={query}
        onFocus={() => setShowSuggestions(true)}
        onChange={handleInputChanged}
      />
      {showSuggestions ? 
        <ul className='suggestions'>
          {suggestions.map((suggestion) => {
            return <li key={suggestion} onClick={handleItemClicked}>{suggestion}</li>
          })}
          <li key='See all cities' onClick={handleItemClicked}>
            <b>See all cities</b>
          </li>
        </ul>
        : null}
    </div>
  )
 }

 export default CitySearch;