import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';

import '../tic-tac-toe.js';

describe('TicTacToe', () => {
  it('has a default header "Hey there" and counter 5', async () => {
    const el = await fixture(html`<tic-tac-toe></tic-tac-toe>`);

    expect(el.header).to.equal('Hey there');
    expect(el.counter).to.equal(5);
  });

  it('increases the counter on button click', async () => {
    const el = await fixture(html`<tic-tac-toe></tic-tac-toe>`);
    el.shadowRoot.querySelector('button').click();

    expect(el.counter).to.equal(6);
  });

  it('can override the header via attribute', async () => {
    const el = await fixture(html`<tic-tac-toe header="attribute header"></tic-tac-toe>`);

    expect(el.header).to.equal('attribute header');
  });

  it('passes the a11y audit', async () => {
    const el = await fixture(html`<tic-tac-toe></tic-tac-toe>`);

    await expect(el).shadowDom.to.be.accessible();
  });
});
