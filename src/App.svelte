<script lang="ts">
  import { Grid } from './Grid';

  const numberOfSwitches = 100;
  const grid = new Grid(numberOfSwitches);
</script>

<main>
  <h1>The Light Switch Problem</h1>

  <div class="grid">
    {#each grid.cells as sw}
      <div class="cell" class:on={sw} />
    {/each}
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
    grid-template-columns: repeat(10, 1fr);
    gap: 0.25em;
  }

  .cell {
    aspect-ratio: 1;
    opacity: 0.2;
    background: rgb(229, 240, 167);
    border: none;
    border-radius: 50%;
    &.on {
      opacity: 1;
      box-shadow: 0 0 25px 5px #fff;
    }
  }
</style>
