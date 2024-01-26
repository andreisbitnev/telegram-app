<script lang="ts">
    import UserForm from '$lib/components/UserForm.svelte';
    import TokenBox from '$lib/components/TokenBox.svelte';
    import { goto } from '$app/navigation';
    
    export let data;
    let userData: UserInputs = {};
    let userFormReady: boolean = false
    let error: string;

    async function signup() {
        error = '';
        const res = await fetch('/api/signup', {
			method: 'POST',
			body: JSON.stringify({...userData, token: data.token})
		})
		const json = await res.json()
		if (json.error) {
            userFormReady = false;
            error = json.error;
        } else {
            goto('/login')
        }
    }
</script>

{#if userFormReady}
    <TokenBox token={data.token} handler={signup}/>
{:else}
    <UserForm 
        title="Sign up"
        {error} 
        onSuccess={() => userFormReady = true} 
        bind:userData={userData}>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account <a href="/login" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
            </p>
    </UserForm>
{/if}
