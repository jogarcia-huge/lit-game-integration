import { html } from 'lit';
import '../tic-tac-toe.js';

export default {
  title: 'TicTacToe',
  component: 'tic-tac-toe',
  argTypes: {
    header: { control: 'text' },
    counter: { control: 'number' },
    textColor: { control: 'color' },
  },
};

function Template({ header = 'Hello world', counter = 5, textColor, slot }) {
  return html`
    <tic-tac-toe
      style="--tic-tac-toe-text-color: ${textColor || 'black'}"
      .header=${header}
      .counter=${counter}
    >
      ${slot}
    </tic-tac-toe>
  `;
}

export const Regular = Template.bind({});

export const CustomHeader = Template.bind({});
CustomHeader.args = {
  header: 'My header',
};

export const CustomCounter = Template.bind({});
CustomCounter.args = {
  counter: 123456,
};

export const SlottedContent = Template.bind({});
SlottedContent.args = {
  slot: html`<p>Slotted content</p>`,
};
SlottedContent.argTypes = {
  slot: { table: { disable: true } },
};
