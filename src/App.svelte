<script lang="ts">
  import { Grid } from './Grid';

  let columns = 10;
  $: grid = new Grid(columns * columns);
  $: cells = grid.cells;
  $: playing = grid.playing;
  $: shouldPause = grid.shouldPause;
  $: step = grid.step;
</script>

<main>
  <h1>The Light Switch Problem</h1>

  <div class="grid" style="--columns: {columns}">
    {#each $cells as lightSwitch, i}
      <div class="cell" class:on={lightSwitch} title={(i + 1).toString()}>
        {#if columns <= 10}
          <div class="cell-label">
            {i + 1}
          </div>
        {/if}
      </div>
    {/each}
  </div>

  <div class="settings">
    <div class="settings-row">
      <div class="field field-range">
        <label for="field-columns">Grid Size:</label>
        <input
          id="field-delay"
          type="range"
          bind:value={columns}
          min="4"
          max="30"
          step="1"
        />
        ({columns})
      </div>
    </div>
    <div class="settings-row">
      <div class="field field-range">
        <label for="field-delay">Delay:</label>
        <input
          id="field-delay"
          type="range"
          bind:value={grid.delay}
          min="0"
          max="2000"
          step="100"
        />
        ({grid.delay}ms)
      </div>
    </div>
    <div class="settings-row">
      <div class="field field-text">
        <label for="field-step">Step:</label>
        <input type="number" bind:value={$step} disabled={$playing} />
      </div>
    </div>
  </div>

  <div class="controls">
    <button on:click={() => grid.play()} disabled={$playing}>Play</button>
    <button on:click={() => grid.pause()} disabled={!$playing || $shouldPause}>Pause</button>
    <button on:click={() => grid.apply()} disabled={$playing}>Apply</button>
    <button on:click={() => grid.clear()} disabled={$playing}>Clear</button>
  </div>
</main>

<style lang="scss">
  h1 {
    text-align: center;
  }
  .grid {
    display: grid;
    width: 100%;
    max-width: 600px;
    margin: auto;
    grid-template-columns: repeat(var(--columns), 1fr);
  }

  .cell {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    aspect-ratio: 1;
    &::before {
      content: '';
      position: absolute;
      left: 50%;
      top: 50%;
      width: 75%;
      height: 75%;
      transform: translate(-50%, -50%);
      opacity: 0.2;
      background: rgb(229, 240, 167);
      border: none;
      border-radius: 50%;
    }
    .cell-label {
      position: relative;
      z-index: 10;
    }
    &.on {
      .cell-label {
        color: #000;
      }
      &::before {
        z-index: -1;
        opacity: 1;
        box-shadow: 0 0 25px 5px #fff;
      }
    }
  }

  .settings, .controls {
    text-align: center;
    margin: 2em 0;
  }

  .settings-row {
    margin: 0.5em 0;
  }

  .field {
    display: inline-flex;
    align-items: center;
    label {
      margin-right: 0.5em;
    }
  }
</style>
