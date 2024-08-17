import { HomePage } from "@pages/home/ui";
import { NotFoundPage } from "@pages/not-found/ui";

export const routes = [
	{
		path: "/",
		component: HomePage
	},
	{
		path: "*",
		component: NotFoundPage
	}
];
