**MEET APP**

**WHAT IT IS:**

A serverless, progressive web application (PWA) built with React using a
test-driven development (TDD) technique. The application uses the Google
Calendar API to fetch upcoming events.

**PROJECT FEATURES AND SCENARIOS:**

**Feature 1: Filter Events by City**
User Story: As a user, I should be able to filter events by city so that I can see a list of events taking place in that city.

**Scenario 1:** When user hasn’t searched for a city, show upcoming events from all cities.
- Given: user hasn’t searched for any city;
- When: the user opens the app;
- Then: the user should see a list of upcoming events.
**Scenario 2: **User should see a list of suggestions when they search for a city.
- Given: the main page is open;
- When: user starts typing in the city textbox;
- Then: the user should receive a list of cities (suggestions) that match what they’ve typed.
Scenario 3: User can select a city from the suggested list.
- Given: user was typing “Berlin” in the city textbox AND the list of suggested cities is showing;
- When: the user selects a city (e.g., “Berlin, Germany”) from the list;
- Then: their city should be changed to that city (i.e., “Berlin, Germany”) AND the user should receive a list of upcoming events in that city.

**Feature 2: Show/Hide Event Details**
User Story: As a user, I should be able to show or hide event details so that I can see the details of only the events I am interested in.

**Scenario 1: **An event element is collapsed by default.
- Given: User hasn’t selected any event;
- When: the app is open and events are shown;
- Then: the event element should be collapsed (not showing details).
**Scenario 2: **User can expand an event to see details.
- Given: events are shown on the screen;
- When: the user clicks an event element;
- Then: the details of that event should become visible.
**Scenario 3: **User can collapse an event to hide details.
- Given: The details of an event are visible;
- When: the user closes the event element;
- Then: the details of that event should be hidden.

**Feature 3: Specify Number of Events**
User Story: As a user, I should be able to specify the number of events shown so that I can expand or limit the amount of events I see at once.

**Scenario 1: **When user hasn’t specified a number, 32 events are shown by default.
- Given: The user hasn’t specified a number;
- When: the events page is open;
- Then: 32 events should be displayed.
**Scenario 2: **User can change the number of events displayed.
- Given: The user has specified the number of events (e.g., 10);
- When: the events page is open;
- Then: the specified number of events (i.e.,10) will be displayed.

**Feature 4: Use the App When Offline**
User Story: As a user, I should be able to use the app offline so that I can still access saved information when there is no internet connection available.

**Scenario 1: **Show cached data when there’s no internet connection
- Given: The user does not have internet connection;
- When: the user opens the app;
- Then: cached data is available to the user.
**Scenario 2: **Show error when user changes search settings (city, number of events).
- Given: The user is offline;
- When: the user changes search settings;
- Then: an error message should be displayed.

**Feature 5: Add an App Shortcut to the Home Screen**
User Story: As a user, I should be able to add an app shortcut to my home screen so that I can quickly access the app on my device.

**Scenario 1: **User can install the meet app as a shortcut on their device home screen.
- Given: the meet app is installed on the user’s device;
- When: the adds an app shortcut to the home screen;
- Then: an app shortcut should be visible on the user's device home screen.

**Feature 6: Display Charts Visualizing Event Details**
User Story: As a user, I should be able to display charts visualizing event details so that I can easily see what types of events are available and where (in which cities).

**Scenario 1:** Show a chart with the number of upcoming events in each city.
- Given: The app is open;
- When: the user views the main page;
- Then: a chart should display the number of upcoming events in each city.
