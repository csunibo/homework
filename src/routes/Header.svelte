<script>
	import { page } from '$app/stores';
	import github from '$lib/images/github.svg';
</script>

<header class="flex items-center justify-between p-6 bg-base/50 border-b border-base-200">
	<div class="flex items-center">
		<h1 class="text-secondary text-lg">CartaBinaria Homework Repository</h1>
	</div>
	<nav>
		<ul class="flex space-x-4">
			<li><a href="/" class="text-content hover:text-secondary">Home</a></li>
			<li><a href="/assignments" class="text-content hover:text-secondary">Assignments</a></li>
			<li><a href="/resources" class="text-content hover:text-secondary">Resources</a></li>
		</ul>
	</nav>
	<a href="https://github.com/your-github-username/homework" target="_blank">
		<img src={github} alt="GitHub logo" class="h-8 w-8" />
	</a>
</header>
