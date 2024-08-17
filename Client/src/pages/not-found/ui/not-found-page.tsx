import "./not-found-page.less";

import { Component } from "solid-js";

export const NotFoundPage: Component = () => {
	return (
		<main>
			<section>
				<h1>404</h1>
				<p>Sorry, the page you are looking for does not exist.</p>
				<a href="/" target="_self">
					Go Back to Home
				</a>
			</section>
		</main>
	);
};
