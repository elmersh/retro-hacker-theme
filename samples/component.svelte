<script lang="ts">
  export let name: string = 'world';
  let count = 0;
  $: doubled = count * 2;
  const inc = () => (count += 1);
</script>

<main>
  <h1>Hello {name}!</h1>
  {#if count > 5}
    <p class="hot">¡Calmate! {doubled}</p>
  {:else}
    <p>Clicks: {count}</p>
  {/if}
  {#each ['a', 'b', 'c'] as letter, i}
    <span>{i}:{letter}</span>
  {/each}
  <button on:click={inc}>+1</button>
</main>

<style>
  h1 { color: #39ff14; text-transform: uppercase; }
</style>
