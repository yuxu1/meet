const NumberOfEvents = ({ setCurrentNOE, setErrorAlert }) => {

  const handleInputUpdate = (event) => {
    const value = event.target.value;
    let errorText;
    //show errorAlert if entered value is not a positive number
    if (value <= 0) {
      errorText = 'Only positive numbers are allowed';
    } else {
      setCurrentNOE(value);
      errorText = '';
    }
    setErrorAlert(errorText);
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