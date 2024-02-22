import { useState } from "react";

const Event = ({ event }) => {
  const [showDetails, setShowDetails] = useState(false);

  //handles state of showDetails (whether or not event details are shown)
  const handleDetailsClicked = () => {
    showDetails ? setShowDetails(false) : setShowDetails(true)
  };

  return (
    <li>
      <h3>{event.summary}</h3>
      <p>{event.location}</p>
      <p>{event.start.dateTime}</p>

      {/* show details if value of showDetails state is set to true */}
      {showDetails ? <p className='details'>{event.description}</p> : null}

      {/* button displays text 'show details' or 'hide details' depending on if event details are currently showing */}
      <button className='details-button' onClick={handleDetailsClicked}>
        {!showDetails ? 'show details' : 'hide details'}
      </button>
    </li>
  )
}

export default Event;