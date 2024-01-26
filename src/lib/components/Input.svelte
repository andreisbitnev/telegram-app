<script lang="ts">
    import { onMount } from "svelte";
    export let label:string|undefined;
    export let name:string|undefined;
    export let value:string|undefined;
    export let error:string|undefined;
    export let type:string|undefined;
    export let placeholder:string|undefined;
    let inputElement: HTMLInputElement;
    onMount(() => {
        if (type) {
            inputElement.type = type;
        }
    });
</script>
<div>
    <label for="{label}" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
    <input bind:this={inputElement} {name} id="{name}" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" {placeholder} bind:value={value} autocomplete="on">
    {#if error}
        <p class="text-red-600">{error}</p>
    {/if}
</div>