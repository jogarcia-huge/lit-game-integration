import {LitElement, html, css} from 'lit';

class TicTacToeCell extends LitElement {

  static styles = css`
    :host {
        --box-bg-color: #fefef0;
        --box-size: calc((var(--board-size) / 3) - 15px);
        width: var(--box-size);
        height: var(--box-size);
        background: var(--box-bg-color);
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .cross {
        background:  rgb(71, 69, 78);
        height: 100px;
        position: relative;
        width: 10px;
        transform: rotate(45deg);
        border-radius: 30px;
    }
    .cross:after {
        background:  rgb(71, 69, 78);
        content: "";
        height: 10px;
        left: -45px;
        position: absolute;
        top: 45px;
        width: 100px;
        border-radius: 30px;
    }
    .circle {
        background: transparent;
        border: 10px solid rgb(184, 64, 57);
        width: 75px;
        height: 70px;
        border-radius: 50%;
    }
  `;

  static properties = {
    symbolClass: { type: String },
    col: { type: Number },
    row: { type: Number }
  }

  constructor() {
    super();
    this.symbolClass = ' ';
  }

  setSymbol(symbol) {
    this.symbolClass = symbol;
  }

  render() {
    return html`
      <div class="${this.symbolClass}"></div>
    `;
  }
}

customElements.define('tic-tac-toe-cell', TicTacToeCell);