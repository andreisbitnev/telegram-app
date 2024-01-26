<script lang="ts">
    export let href:string;
</script>

<a
    {href} 
    class="font-medium text-primary-600 hover:underline dark:text-primary-500">
    <slot></slot>
</a>