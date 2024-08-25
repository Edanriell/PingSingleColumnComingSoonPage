import "./not-found-page.less";

import { Component } from "solid-js";

import { Button } from "@shared/ui/button/ui";

export const NotFoundPage: Component = () => {
	return (
		<main class="not-found-page">
			<section class="not-found">
				<h1 class="not-found__title">404</h1>
				<p class="not-found__text">Sorry, the page you are looking for does not exist.</p>
				<Button>Go Back to Home</Button>
			</section>
		</main>
	);
};
