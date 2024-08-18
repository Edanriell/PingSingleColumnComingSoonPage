import { children, Component, JSX } from "solid-js";

type MainLayoutProps = {
	children: JSX.Element;
};

export const MainLayout: Component<MainLayoutProps> = (props) => {
	const safeChildren = children(() => props.children);

	return <>{safeChildren()}</>;
};
