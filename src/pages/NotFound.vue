<template>
	<div class="notFound">
		<h1>404</h1>
		<p>Page not found</p>
		<router-link to="/">
			<button>Go Home</button>
		</router-link>
	</div>
</template>

<style lang="scss" scoped>
.notFound {
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	h1 {
		font-size: 10rem;
		line-height: 1;
	}
	p {
		font-size: 2.5rem;
	}

	a {
		text-decoration: none;
		cursor: inherit;
		display: block;
		button {
			margin-top: 1rem;
			background: $color-accent;
			border: none;
			cursor: pointer;
			color: $color-foreground-1;
			padding: 0.2rem 2rem;
			font-size: 1.5rem;
			border-radius: 5px;
			display: grid;
			place-items: center;
			font-size: 1.5rem;
		}
	}
}
</style>
