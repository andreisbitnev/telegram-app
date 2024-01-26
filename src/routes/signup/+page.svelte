<script lang="ts">
    import UserForm from '$lib/components/UserForm.svelte';
    import TokenBox from '$lib/components/TokenBox.svelte';
    import Paragraph from '$lib/components/Paragraph.svelte';
    import Link from '$lib/components/Link.svelte';
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
            <Paragraph>
                Already have an account 
                <Link href="/login">Login here</Link>
            </Paragraph>
    </UserForm>
{/if}
