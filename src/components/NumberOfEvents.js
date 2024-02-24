const NumberOfEvents = ({ setCurrentNOE }) => {

  const handleInputUpdate = (event) => {
    const value = event.target.value;
    setCurrentNOE(value);
  };

  return (
    <div id='number-of-events'>
      <label>Number of Events:</label>
      <input
        type='number'
        className='number-of-events-input'
        defaultValue={32}
        onChange={handleInputUpdate}
      />
    </div>
  )
}

export default NumberOfEvents;