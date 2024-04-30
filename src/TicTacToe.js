/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
/* eslint-disable dot-notation */
/* eslint-disable no-plusplus */
import { html, css, LitElement } from 'lit';
import './TicTacToeCell.js';

export class TicTacToe extends LitElement {

  static styles = css`
    :host {
      --board-bg-color: #e5d6c2;
      --board-size: calc(min(100vw, 100vh) - 60px);
    }
    .board {
      width: var(--board-size);
      height: var(--board-size);
      padding: 20px;
      margin-left: auto;
      margin-right: auto;
      background: var(--board-bg-color);
      display: flex;
      flex-wrap: wrap;
      align-content: space-between;
      justify-content: space-between;
      border-radius: 13px;
    }
    .label-container {
      background: var(--board-bg-color);
      font-family: 'Google Sans', sans-serif;
      padding: 1em;
      position: absolute;
      text-align: center;
      top: 50%;
      width: 100%;
      z-index: 1;
    }
    .label-container button {
      display: block;
      font-family: 'Google Sans', sans-serif;
      font-size: 1.2em;
      margin: 1em auto 0;
    }
  `;

  static properties = {
    isPlaying: { type: Boolean },
    label: { type: String },
    board: { type: Array },
    currentPlayer: { type: Number },
    plays: { type: Object },
    turn: { type: Number }
  };

  constructor() {
    super();

    this.isPlaying = false;
    
    this.addEventListener('player-win', e => {
      this. label = `Player ${e.detail.player} has won`;
      this.dispatchEvent(new CustomEvent('end'));
    });
    this.addEventListener('tie', () => {
      this. label = `It's a tie 🤨`;
      this.dispatchEvent(new CustomEvent('end'));
    });

    this.paintBoard();
  }

  paintBoard() {
    this.board = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ];
  }

  resetBoard() {
    this.paintBoard();
    
    const cells = this.shadowRoot.querySelectorAll('tic-tac-toe-cell');
    if (cells) cells.forEach(x => { x.setSymbol('') });

    this.turn = 1;
    this.currentPlayer = 1;
    this.plays = { 1: 0, 2: 0 };
  }

  checkHorizontal(player) {
    for (let row = 0; row < this.board.length; row++) {
      let count = 0;
      for (let col = 0; col < this.board.length; col++) {
        if (this.board[row][col] === player) {
          count++;
        } else {
          break;
        }
  
        if (count === this.board.length) {
          return true;
        }
      }
    }
    return false;
  }
  
  checkVertical(player) {
    for (let col = 0; col < this.board.length; col++) {
      let count = 0;
      for (let row = 0; row < this.board.length; row++) {
        if (this.board[row][col] === player) {
          count ++;
        } else {
          break;
        }
  
        if (count === this.board.length) {
          return true;
        }
      }
    }
    return false;
  }
  
  checkDiagonal(player) {
    let count = 0
    for (let row = 0, col = 0; row < this.board.length; row++, col++) {
      if (this.board[row][col] === player) {
        count++;
      } else {
        break;
      }
      if (count === this.board.length) {
        return true;
      }
    }
    count = 0;
    for (let row = 0, col = this.board.length - 1; 
          row < this.board.length; row++, col--) {
      if (this.board[row][col] === player) {
        count++;
      } else {
        break;
      }
      if (count === this.board.length) {
        return true;
      }
    }
    return false;
  }
  
  checkVictory(player) {
    return this.checkHorizontal(player)
        || this.checkVertical(player)
        || this.checkDiagonal(player);
  }

  _handleClick(e) {
    if (!this.isPlaying) return;

    if (this.board[e.target.row][e.target.col] !== 0) {
      console.warn(`Cell is already used, marked as ${  e.target.symbol}`);
      return;
    }
    
    e.target.setSymbol(this.currentPlayer === 1 ? 'cross' : 'circle');
    
    this.board[e.target.row][e.target.col] = this.currentPlayer;
    this.plays[this.currentPlayer]++;

    if (this.checkVictory(this.currentPlayer)) {
      this.isPlaying = false;
      this.dispatchEvent(new CustomEvent('player-win', {
        detail: { player: this.currentPlayer }
      }));
    } else if (this.plays[1] + this.plays[2] === 9) {
      this.isPlaying = false;
      this.dispatchEvent(new CustomEvent('tie'));
    } else {
      this.turn++;
      this.changePlayer();
    }
  }

  _handleStartClick() {
    if (!this.isPlaying) {
      this.resetBoard();
      this.isPlaying = true;
    }
  }
  
  changePlayer() {
    this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
  }

  render() {
    if (!this.board) return '';

    return html`
      <main>
        <div class="label-container" ?hidden=${this.isPlaying}>
          <div class="label">${this.label}</div>
          <button @click="${this._handleStartClick}">${this.turn === undefined ? 'Start' : 'Play again'}</button>
        </div>
        <div class="board">
          ${this.board.map((row, rowIndex) =>
            row.map((col, colIndex) => 
              html`
                <tic-tac-toe-cell
                  .col=${colIndex}
                  .row=${rowIndex}
                  @click="${this._handleClick}"
                >
                </tic-tac-toe-cell>`
            ))}
        </div>
      </main>
    `;
  }

}

customElements.define('tic-tac-toe', TicTacToe);