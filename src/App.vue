<template>
	<router-view></router-view>
</template>

<script>
	export default {
		name: 'App',
		components: {}
	}
</script>

<style>
	body {
		margin: 0px;
	}

	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
	}

	*::-webkit-scrollbar {
		width: 4px;
		height: 4px;
	}

	*::-webkit-scrollbar-thumb {
		border-radius: 4px;
		background: #5E708D;
	}

	*::-webkit-scrollbar-track {
		border-radius: 4px;
		background: #ddd;
	}
</style>
