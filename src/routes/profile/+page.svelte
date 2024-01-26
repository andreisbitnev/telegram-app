<script lang="ts">
    import Input from '$lib/components/Input.svelte';
    import Title from '$lib/components/Title.svelte';
    import SubTitle from '$lib/components/SubTitle.svelte';
    import Button from '$lib/components/Button.svelte';
    import { goto } from '$app/navigation';
        
    let profileData: {telegramId: string, createdAt: Date, error: any};
    let token: string;

    function formatDate(date: Date): string {
        return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
    }

    async function getProfileData() {
        const res = await fetch('/api/profile', {
			method: 'POST',
			body: JSON.stringify({ token })
		})
		profileData = await res.json();
        if (profileData.error) {
            goto('/');
        }
    }
</script>
{#if profileData}
    <Title text="Profile info" />
    <SubTitle text={profileData.telegramId} />
    <SubTitle text={`Created: ${formatDate(new Date(profileData.createdAt))}`} />
{:else}
    <SubTitle text='Please enter your token and click "OK"' />
    <Input 
        label={"Token"} 
        name={"token"} 
        bind:value={token}
        error=''
        type="text"
        placeholder="••••••••"
    />
    <Button text="OK" handler={getProfileData}/>
{/if}