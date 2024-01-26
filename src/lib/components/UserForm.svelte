<script lang="ts">
    import * as yup from 'yup';
    import { enhance } from '$app/forms';
    import Input from '$lib/components/Input.svelte';
    import Title from '$lib/components/Title.svelte';
    import Button from '$lib/components/Button.svelte';
    export let title: string;
    export let error: string;
    export let onSuccess: () => void;
    export let userData: UserInputs;
    
    const inputErrors: UserInputs = {};

    const schema = yup.object({
        telegramId: yup.string()
            .required('Telegram Id is required')
            .matches(/^[0-9]+$/, "Telegram Id must be a minimum 6 digit number")
            .min(6, 'Telegram Id must be a minimum 6 digit number'),
        password: yup.string()
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters long')     
    });

    async function validateForm() {
        Object.keys(inputErrors).forEach(key => inputErrors[key as keyof UserInputs] = '');
        error = '';
        try {
            await schema.validate(userData, { abortEarly: false });
            onSuccess();
        } catch (error: any) {
            error.inner.forEach((err: any) => {
                inputErrors[err.path as keyof UserInputs] = err.message;
            });
        }
    }
</script>
<Title text={title} />
<form class="space-y-4 md:space-y-6" method="POST" action="?/signup" use:enhance>
    <Input 
        label={"Telegram Id"} 
        name={"telegramId"} 
        bind:value={userData.telegramId}
        error={inputErrors.telegramId}
        type="text"
        placeholder="123456789"
    />
    <Input 
        label={"Password"} 
        name={"password"} 
        bind:value={userData.password}
        error={inputErrors.password}
        type="password"
        placeholder="••••••••"
    />
    {#if error}
        <p class="text-red-600">{error}</p>
    {/if}
    <Button text={title} handler={validateForm}/>
    <slot></slot>
</form>