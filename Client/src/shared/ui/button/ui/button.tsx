import "./button.less";

import gsap from "gsap";

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

	let buttonRef!: HTMLButtonElement;

	const handleButtonMouseEnter = () => {
		gsap.to(buttonRef, {
			backgroundColor: "hsla(223, 87%, 63%, 0.8)",
			scale: 1.05,
			duration: 0.25,
			ease: "power1.out"
		});
	};

	const handleButtonMouseLeave = () => {
		gsap.to(buttonRef, {
			backgroundColor: "hsl(223, 87%, 63%)",
			scale: 1,
			duration: 0.25,
			ease: "power1.out"
		});
	};

	const handleButtonMouseDown = () => {
		gsap.to(buttonRef, {
			scale: 0.95,
			duration: 0.15,
			ease: "power1.out"
		});
	};

	const handleButtonMouseUp = () => {
		gsap.to(buttonRef, {
			scale: 1.05,
			duration: 0.15,
			ease: "power1.out"
		});
	};

	const handleButtonTouchStart = () => {
		gsap.to(buttonRef, {
			backgroundColor: "hsla(223, 87%, 63%, 0.8)",
			scale: 0.95,
			duration: 0.15,
			ease: "power1.out"
		});
	};

	const handleButtonTouchEnd = () => {
		gsap.to(buttonRef, {
			backgroundColor: "hsl(223, 87%, 63%)",
			scale: 1,
			duration: 0.15,
			ease: "power1.out"
		});
	};

	return (
		<button
			class={finalProps.classes + " button"}
			type={finalProps.type as any}
			disabled={finalProps.isDisabled}
			onMouseEnter={handleButtonMouseEnter}
			onMouseLeave={handleButtonMouseLeave}
			onMouseDown={handleButtonMouseDown}
			onMouseUp={handleButtonMouseUp}
			onTouchStart={handleButtonTouchStart}
			onTouchEnd={handleButtonTouchEnd}
			ref={buttonRef}
		>
			{safeChildren()}
		</button>
	);
};
