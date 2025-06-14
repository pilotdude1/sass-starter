<script lang="ts">
	import { createClient } from '@supabase/supabase-js';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
	const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
	const supabase = createClient(supabaseUrl, supabaseAnonKey);

	let email = '';
	let password = '';
	let rememberMe = false;
	let errorMsg = '';

	async function login() {
		const { error } = await supabase.auth.signInWithPassword({ email, password });
		if (error) {
			errorMsg = error.message;
		} else {
			if (rememberMe && browser) {
				localStorage.setItem('rememberEmail', email);
			}
			window.location.href = '/dashboard';
		}
	}

	function toggleDarkMode() {
		const html = document.documentElement;
		html.classList.toggle('dark');
		localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
	}

	onMount(() => {
		if (browser && localStorage.getItem('theme') === 'dark') {
			document.documentElement.classList.add('dark');
		}
		const storedEmail = localStorage.getItem('rememberEmail');
		if (storedEmail) email = storedEmail;
	});
</script>

<div class="flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-gray-900">
	<div class="w-full max-w-md space-y-6 rounded-2xl bg-white p-8 shadow-xl dark:bg-gray-800">
		<div class="flex items-center justify-between">
			<h1 class="text-2xl font-bold text-gray-900 dark:text-white">LocalSocialMax</h1>
			<button on:click={toggleDarkMode} class="text-yellow-500">🌞</button>
		</div>

		<h2 class="text-xl font-semibold text-gray-900 dark:text-white">Welcome Back!</h2>
		<p class="text-gray-600 dark:text-gray-300">Sign in to your account</p>

		{#if errorMsg}
			<div class="text-sm text-red-500">{errorMsg}</div>
		{/if}

		<input
			type="email"
			bind:value={email}
			placeholder="Email address"
			class="w-full rounded-lg border px-4 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
		/>
		<input
			type="password"
			bind:value={password}
			placeholder="Password"
			class="w-full rounded-lg border px-4 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
		/>

		<div class="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
			<label class="flex items-center">
				<input type="checkbox" bind:checked={rememberMe} class="mr-2" /> Remember me
			</label>
			<a href="/forgot-password" class="text-blue-600 hover:underline">Forgot password?</a>
		</div>

		<button
			on:click={login}
			class="w-full rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
			>Login</button
		>

		<div class="flex items-center justify-center text-gray-500 dark:text-gray-400">
			<span class="px-2">or continue with</span>
		</div>

		<div class="flex gap-2">
			<button
				on:click={() => supabase.auth.signInWithOAuth({ provider: 'github' })}
				class="flex flex-1 items-center justify-center gap-2 rounded-lg border px-4 py-2"
			>
				<span>🐱 GitHub</span>
			</button>
			<button
				on:click={() => supabase.auth.signInWithOAuth({ provider: 'google' })}
				class="flex flex-1 items-center justify-center gap-2 rounded-lg border px-4 py-2"
			>
				<span>🟢 Google</span>
			</button>
		</div>
		<button
			on:click={() => supabase.auth.signInWithOAuth({ provider: 'facebook' })}
			class="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white"
		>
			<span>📘 Facebook</span>
		</button>

		<div class="text-center text-sm text-gray-600 dark:text-gray-300">
			Don’t have an account? <a href="/signup" class="text-blue-600 hover:underline">Sign up</a>
		</div>
	</div>
</div>

<style>
	input:focus {
		outline: none;
		box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
	}
</style>
