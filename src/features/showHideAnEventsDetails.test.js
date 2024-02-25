/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/render-result-naming-convention */
import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, (test) => {
  test('An event element is collapsed by default.', ({ given, when, then }) => {
    given("user hasn't selected any event", () => {});

    let AppComponent;
    let AppDOM;
    let EventListDOM;
    let EventListItems;
    when('the app is open and events are shown', async () => {
      AppComponent = render(<App />);
      AppDOM = AppComponent.container.firstChild;
      EventListDOM = AppDOM.querySelector('#event-list');
      await waitFor(() => {
        EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems.length).toBe(32);
      });
    });

    then('the event element should be collapsed (not showing details)', () => {
      const EventDetails = EventListItems[0].querySelector('.details');
      expect(EventDetails).toBeNull();
    });
  });

  test('User can expand an event to see details.', ({ given, when, then }) => {
    let EventListItems;
    given('events are shown on the screen', async () => {
      const AppComponent = render(<App />);
      const AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector('#event-list');
        await waitFor(() => {
         EventListItems = within(EventListDOM).queryAllByRole('listitem');
         expect(EventListItems.length).toBe(32);
      });
    });

    when('the user clicks an event element', async () => {
      const user = userEvent.setup();
      const detailsButton = within(EventListItems[0]).queryByText('show details');
      await user.click(detailsButton);
    });

    then('the details of that event should become visible', () => {
      const EventDetails = EventListItems[0].querySelector('.details');
      expect(EventDetails).toBeDefined();
    });
  });

  test('User can collapse an event to hide details.', ({ given, when, then }) => {
    let user;
    let EventListItems;
    let detailsButton;
    given('the details of an event are visible', async () => {
      const AppComponent = render(<App />);
      const AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector('#event-list');
      await waitFor(() => {
        EventListItems = within(EventListDOM).queryAllByRole('listitem');
        detailsButton = within(EventListItems[0]).queryByText('show details');
      });
      user = userEvent.setup();
      await user.click(detailsButton);
    });

    when('the user closes the event element', async () => {
      detailsButton = within(EventListItems[0]).queryByText('hide details');
      await user.click(detailsButton);
    });

    then('the details of that event should be hidden', () => {
      const EventDetails = EventListItems[0].querySelector('.details');
      expect(EventDetails).toBeNull();
    });
  });
});
