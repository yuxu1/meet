const NumberOfEvents = () => {
  return (
    <div id='number-of-events'>
      <label>Number of Events:</label>
      <input
        type='number'
        className='number-of-events-input'
        defaultValue={32}
      />
    </div>
  )
}

export default NumberOfEvents;