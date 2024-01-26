<script lang="ts">
    import UserForm from '$lib/components/UserForm.svelte';
    import Paragraph from '$lib/components/Paragraph.svelte';
    import Link from '$lib/components/Link.svelte';
    import { goto } from '$app/navigation';
    
    let userData: UserInputs = {};
    let error: string;

    async function login() {
        error = '';
        const res = await fetch('/api/login', {
			method: 'POST',
			body: JSON.stringify(userData)
		})
		const json = await res.json()
		if (json.error) {
            error = json.error;
        }
        if (json.success) {
            goto('/profile');
        }
    }
</script>
<UserForm 
    title="Log in"
    {error} 
    onSuccess={login} 
    bind:userData={userData}>
        <Paragraph>
            Don't have an acount yet 
            <Link href="/">Sign up</Link>
        </Paragraph>
</UserForm>