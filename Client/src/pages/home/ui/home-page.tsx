import "./home-page.less";

import { Component } from "solid-js";

import { MainLayout } from "@widgets/layouts/main/ui";

export const HomePage: Component = () => {
	return (
		<MainLayout>
			<main class="home-page">
				<h1>Home Page</h1>
			</main>
		</MainLayout>
	);
};
