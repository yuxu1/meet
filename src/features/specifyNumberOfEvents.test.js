/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/render-result-naming-convention */
import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, (test) => {
  test('When user hasn\'t specified a number, 32 events are shown by default.', ({ given, when, then }) => {
    given('the user hasn\'t specified a number', () => {});

    let AppComponent;
    when('the events page is open', () => {
      AppComponent = render(<App />);
    });

    then('32 events should be displayed', async () => {
      const AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector('#event-list');
      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems.length).toBe(32);
      });
    });
  });

  test('User can change the number of events displayed', ({ given, when, then }) => {
    let AppComponent;
    let AppDOM;
    given('the events page is open', () => {
      AppComponent = render(<App />);
    });

    when(/^the user specifies the number of events \(e.g.,(\d+)\)$/, async (arg0) => {
      AppDOM = AppComponent.container.firstChild;
      const NumberOfEventsDOM = AppDOM.querySelector('#number-of-events');
      const NumberTextBox = within(NumberOfEventsDOM).queryByRole('spinbutton');
      const user = userEvent.setup();
      await user.type(NumberTextBox, '{backspace}{backspace}10');
    });

    then(/^the specified number of events \(i.e.,(\d+)\) will be displayed$/, async (arg0) => {
      const EventListDOM = AppDOM.querySelector('#event-list');
      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems).toHaveLength(10);
      });
    });
  });
});