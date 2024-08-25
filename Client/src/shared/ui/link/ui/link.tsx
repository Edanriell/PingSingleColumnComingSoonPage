import "./link.less";

import gsap from "gsap";

import { children, Component, JSX, mergeProps } from "solid-js";

type LinkProps = {
	href?: string;
	target?: "_blank" | "_self" | "_top" | "_parent";
	classes?: string;
	children: JSX.Element;
};

export const Link: Component<LinkProps> = (props) => {
	const finalProps = mergeProps({ href: "#", classes: "", target: "_self" }, props);

	const safeChildren = children(() => props.children);

	let linkRef!: HTMLAnchorElement;

	const handleAnchorMouseEnter = () => {
		gsap.to(linkRef, {
			backgroundColor: "hsla(223, 87%, 63%, 0.8)",
			scale: 1.05,
			duration: 0.25,
			ease: "power1.out"
		});
	};

	const handleAnchorMouseLeave = () => {
		gsap.to(linkRef, {
			backgroundColor: "hsl(223, 87%, 63%)",
			scale: 1,
			duration: 0.25,
			ease: "power1.out"
		});
	};

	const handleAnchorMouseDown = () => {
		gsap.to(linkRef, {
			scale: 0.95,
			duration: 0.15,
			ease: "power1.out"
		});
	};

	const handleAnchorMouseUp = () => {
		gsap.to(linkRef, {
			scale: 1.05,
			duration: 0.15,
			ease: "power1.out"
		});
	};

	const handleAnchorTouchStart = () => {
		gsap.to(linkRef, {
			backgroundColor: "hsla(223, 87%, 63%, 0.8)",
			scale: 0.95,
			duration: 0.15,
			ease: "power1.out"
		});
	};

	const handleAnchorTouchEnd = () => {
		gsap.to(linkRef, {
			backgroundColor: "hsl(223, 87%, 63%)",
			scale: 1,
			duration: 0.15,
			ease: "power1.out"
		});
	};

	return (
		<a
			class={finalProps.classes + " link"}
			href={finalProps.href}
			target={finalProps.target}
			onMouseEnter={handleAnchorMouseEnter}
			onMouseLeave={handleAnchorMouseLeave}
			onMouseDown={handleAnchorMouseDown}
			onMouseUp={handleAnchorMouseUp}
			onTouchStart={handleAnchorTouchStart}
			onTouchEnd={handleAnchorTouchEnd}
			ref={linkRef}
		>
			{safeChildren()}
		</a>
	);
};
