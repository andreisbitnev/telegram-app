<script lang="ts">
    import UserForm from '$lib/components/UserForm.svelte';
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
        <p class="text-sm font-light text-gray-500 dark:text-gray-400">
            Don't have an acount yet <a href="/" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
        </p>
</UserForm>