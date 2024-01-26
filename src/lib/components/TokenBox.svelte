<script lang="ts">
    import SubTitle from '$lib/components/SubTitle.svelte';
    import Button from '$lib/components/Button.svelte';
    export let token:string;
    export let handler:() => void;
    let message: string;
    function copyToken(): void {
        navigator.clipboard.writeText(token);
        message = 'Token saved to clipboard!'
    }
</script>

<SubTitle text={'Save this token, and click "OK"'} />
<p class="cursor-copy" on:click={copyToken}>{token}</p>
{#if message}
    <p class="text-green-600">{message}</p>
{/if}
<Button text="OK" {handler}/>