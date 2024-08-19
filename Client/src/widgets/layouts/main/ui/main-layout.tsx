import { children, Component, JSX } from "solid-js";

import { Header } from "@widgets/header/ui";
import { Footer } from "@widgets/footer/ui";

type MainLayoutProps = {
	children: JSX.Element;
};

export const MainLayout: Component<MainLayoutProps> = (props) => {
	const safeChildren = children(() => props.children);

	return (
		<>
			<Header />
			{safeChildren()}
			<Footer />
		</>
	);
};
