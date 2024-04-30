import { html, LitElement } from 'lit';
import './src/TicTacToe.js';

export class GameArea extends LitElement {

  static properties = {
    ongameload: { type: String },
    ongameend: { type: String }
  };

  connectedCallback() {
    super.connectedCallback();

    const onGameLoad = this.ongameload;
    if (onGameLoad && window[onGameLoad]) {
      // !!! Game wrapper triggers window[onGameLoad] when initializing child.
      window[onGameLoad]();
    }
  }

  firstUpdated() {
    const onGameEnd = this.ongameend;
    if (onGameEnd && window[onGameEnd]) {
      // !!! Game wrapper triggers window[onGameEnd] when child ends.
      this.shadowRoot.querySelector('tic-tac-toe').addEventListener('end', window[onGameEnd]);
    }
  }

  render() {
    return html`
      <tic-tac-toe></tic-tac-toe>
    `;
  }

}

// Initialization
window.customElements.define('game-area', GameArea);