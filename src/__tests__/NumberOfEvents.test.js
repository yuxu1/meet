/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/render-result-naming-convention */
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsComponent;
  beforeEach(() => {
    NumberOfEventsComponent = render(<NumberOfEvents setCurrentNOE={() => {}}/>);
  });

  test('renders text input(for number of events)', () => {
    const numberTextBox = NumberOfEventsComponent.queryByRole('spinbutton');
    expect(numberTextBox).toBeInTheDocument();
    expect(numberTextBox).toHaveClass('number-of-events-input');
  });

  test('default value of input field is set to 32', () => {
    const numberTextBox = NumberOfEventsComponent.queryByRole('spinbutton');
    expect(numberTextBox).toHaveValue(32);
  });

  test('input field value changes accordingly when user types', async () => {
    const user = userEvent.setup();
    const numberTextBox = NumberOfEventsComponent.queryByRole('spinbutton');
    //simulate user deleting default value and typing '10' in textbox
    await user.type(numberTextBox, '{backspace}{backspace}10');
    expect(numberTextBox).toHaveValue(10);
  });
})