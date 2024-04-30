# \<tic-tac-toe>

This webcomponent follows the [open-wc](https://github.com/open-wc/open-wc) recommendation.

## Building

```bash
npm run build
```

## Usage

Use the bundle generated from the `game-area.js` element:

```html
<script>
  window.onGameLoaded = () => {
    console.log('Game has loaded. Triggering Analytics....');
    /* ... Analytics tagging ... */
  }
  window.onGameEnded = () => {
    console.log('Game has completed. Triggering Analytics');
    /* ... Analytics tagging ... */
  }
  </script>
<div class="game-staging-area">
  <game-area ongameload="onGameLoaded" ongameend="onGameEnded" />
</div>
<script src="../dist/game.bundle.min.js"></script>
```
