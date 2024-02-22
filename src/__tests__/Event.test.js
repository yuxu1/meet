/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/prefer-presence-queries */
/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/no-render-in-setup */
import { render } from '@testing-library/react';
import Event from '../components/Event';
import { getEvents } from '../api';
import userEvent from '@testing-library/user-event';

describe('<Event /> component', () => {
  let EventComponent;
  let allEvents;
  beforeEach(async () => {
    allEvents = await getEvents();
    //render just the first event in mock data
    EventComponent = render(<Event event={allEvents[0]} />);
  });

  test('renders event title', () => {
    expect(
      EventComponent.queryByText(allEvents[0].summary)
    ).toBeInTheDocument();
  });

  test('renders event start time', () => {
    expect(
      EventComponent.queryByText(allEvents[0].start.dateTime)
    ).toBeInTheDocument();
  });

  test('renders event location', () => {
    expect(
      EventComponent.queryByText(allEvents[0].location)
    ).toBeInTheDocument();
  });

  test('renders event details button with the title (show details)', () => {
    expect(EventComponent.queryByText('show details')).toBeInTheDocument();
  });

  test('by default,event details section should be hidden', () => {
    expect(EventComponent.container.querySelector('.details')).not.toBeInTheDocument();
  });

  test('shows details section when user clicks on "show details" button', async () => {
    const user = userEvent.setup();
    const detailsButton = EventComponent.queryByText('show details');
    await user.click(detailsButton);
    
    expect(EventComponent.container.querySelector('.details')).toBeInTheDocument();
    //check that "show details" is hidden & "hide details" is displayed instead
    expect(EventComponent.queryByText('show details')).not.toBeInTheDocument();
    expect(EventComponent.queryByText('hide details')).toBeInTheDocument();
  });

  test('hides details section when user clicks on "hide details" button', async () => {
    const user = userEvent.setup();
    const detailsButton = EventComponent.queryByText('hide details');
    await user.click(detailsButton);

    expect(EventComponent.container.querySelector('.details')).not.toBeInTheDocument();
    //check that "hide details" is hidden & "show details" is displayed again
    expect(EventComponent.queryByText('hide details')).not.toBeInTheDocument();
    expect(EventComponent.queryByText('show details')).toBeInTheDocument();
  });
});
