import "./button.less";

import { children, Component, JSX, mergeProps } from "solid-js";

type ButtonProps = {
	type?: "button" | "submit" | "reset";
	classes?: string;
	isDisabled?: boolean;
	children: JSX.Element;
};

export const Button: Component<ButtonProps> = (props) => {
	const finalProps = mergeProps({ type: "button", classes: "", isDisabled: false }, props);

	const safeChildren = children(() => props.children);

	return (
		<button
			class={finalProps.classes + " button"}
			type={finalProps.type as any}
			disabled={finalProps.isDisabled}
		>
			{safeChildren()}
		</button>
	);
};
