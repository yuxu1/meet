Feature: Show/Hide Event Details
 Scenario: An event element is collapsed by default.
  Given user hasn't selected any event
  When the app is open and events are shown
  Then the event element should be collapsed (not showing details)

 Scenario: User can expand an event to see details.
  Given events are shown on the screen
  When the user clicks an event element
  Then the details of that event should become visible

 Scenario: User can collapse an event to hide details.
  Given the details of an event are visible
  When the user closes the event element
  Then the details of that event should be hidden