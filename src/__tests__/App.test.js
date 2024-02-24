/* eslint-disable testing-library/render-result-naming-convention */
/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-node-access */
import { render, within } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import {getEvents} from '../api';

describe('<App /> component', () => {
  let AppDOM;
  beforeEach(() => {
    AppDOM = render(<App />).container.firstChild;
  })

  test('renders list of events', () => {
    expect(AppDOM.querySelector('#event-list')).toBeInTheDocument();
  });

  test('render CitySearch', () => {
    expect(AppDOM.querySelector('#city-search')).toBeInTheDocument();
  });

  test('render NumberOfEvents', () => {
    expect(AppDOM.querySelector('#number-of-events')).toBeInTheDocument();
  });
});

describe('<App /> integration', () => {
  let user;
  let AppComponent;
  let AppDOM;
  beforeEach(() => {
    user = userEvent.setup();
    AppComponent = render(<App />);
    AppDOM = AppComponent.container.firstChild;
  })

  test('renders a list of events matching the city selected by the user', async () => {
    const CitySearchDOM = AppDOM.querySelector('#city-search');
    const CitySearchInput = within(CitySearchDOM).queryByRole('textbox');

    //simulate typing "Berlin" in city search textbox, then clicking on "Berlin, Germany" suggestion
    await user.type(CitySearchInput, "Berlin");
    const berlinSuggestionItem = within(CitySearchDOM).queryByText('Berlin, Germany');
    await user.click(berlinSuggestionItem);

    //finds Event list items in EventList (affected after selecting a suggestion list item)
    const EventListDOM = AppDOM.querySelector('#event-list');
    const allRenderedEventItems = within(EventListDOM).queryAllByRole('listitem');   

    //get list of all events from mock data with location in "Berlin, Germany"
    const allEvents = await getEvents();
    const berlinEvents = allEvents.filter(
      event => event.location === 'Berlin, Germany'
    );
    
    //number of events rendered should match events located in "Berlin, Germany" in mock data
    expect(allRenderedEventItems.length).toBe(berlinEvents.length);
    //ensure all the rendered events contain text "Berlin, Germany"
    allRenderedEventItems.forEach(event => {
      expect(event.textContent).toContain("Berlin, Germany");
    });
  });

  test('render the correct number of events based on user inputted value in "number of events" field', async () => {
   const NumberOfEventsDOM = AppDOM.querySelector('#number-of-events');
   const NumberOfEventsInput = within(NumberOfEventsDOM).queryByRole('spinbutton');
  //simulate user pressing backspace twice to erase "32" and typing "10"
   await user.type(NumberOfEventsInput, '{backspace}{backspace}10');
   const EventListDOM = AppDOM.querySelector('#event-list');
   const allRenderedEventItems = within(EventListDOM).queryAllByRole('listitem');
   
   //rendered events list should include 10 events
   expect(allRenderedEventItems.length).toBe(10);
   
  });
})