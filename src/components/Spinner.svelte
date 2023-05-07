<script lang="ts">
	import clsx from 'clsx';

	let className = '';

	export { className as class };
</script>

<span
	class={clsx(
		'loader w-5 h-5 rounded-full relative before:content-[""] before:inset-0 before:absolute before:rounded-full before:border-2 before:border-gray-900',
		className
	)}
/>

<style scoped>
	.loader {
		animation: rotate 1s linear infinite;
	}

	.loader::before {
		animation: prixClipFix 2s linear infinite;
	}

	@keyframes rotate {
		100% {
			transform: rotate(360deg);
		}
	}

	@keyframes prixClipFix {
		0% {
			clip-path: polygon(50% 50%, 0 0, 0 0, 0 0, 0 0, 0 0);
		}
		25% {
			clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 0, 100% 0, 100% 0);
		}
		50% {
			clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 100% 100%, 100% 100%);
		}
		75% {
			clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 100%);
		}
		100% {
			clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 0);
		}
	}
</style>
