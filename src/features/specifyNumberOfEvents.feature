Feature: Specify Number of Events
 Scenario: When user hasn't specified a number, 32 events are shown by default.
  Given the user hasn't specified a number
  When the events page is open
  Then 32 events should be displayed

 Scenario: User can change the number of events displayed
  Given the events page is open
  When the user specifies the number of events (e.g.,10)
  Then the specified number of events (i.e.,10) will be displayed