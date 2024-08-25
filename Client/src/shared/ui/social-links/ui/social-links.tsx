import "./social-links.less";

import { Component, For, mergeProps } from "solid-js";
import gsap from "gsap";

import { Icon } from "@shared/ui/icon/ui";

import { createRef } from "../lib/functions";

type SocialLinksListProps = {
	classes?: string;
};

export const SocialLinksList: Component<SocialLinksListProps> = (props) => {
	const finalProps = mergeProps({ classes: "" }, props);

	const socialLinks = [
		{
			href: "#",
			name: "Facebook profile",
			Icon: () => <Icon type="facebook" />
		},
		{
			href: "#",
			name: "Twitter profile",
			Icon: () => <Icon type="twitter" />
		},
		{
			href: "#",
			name: "Instagram profile",
			Icon: () => <Icon type="instagram" />
		}
	];

	let linksRefs: Array<HTMLAnchorElement> | [] = [];

	const handleAnchorMouseEnter = (index: number) => {
		gsap.to(linksRefs[index], {
			backgroundColor: "rgba(76, 123, 243, 1)",
			borderColor: "rgba(76, 123, 243, 1)",
			color: "rgba(255, 255, 255, 1)",
			scale: 1.2,
			duration: 0.25,
			ease: "power1.out"
		});
	};

	const handleAnchorMouseLeave = (index: number) => {
		gsap.to(linksRefs[index], {
			backgroundColor: "rgba(0, 0, 0, 0)",
			borderColor: "rgba(76, 123, 243, 0.15)",
			color: "rgba(76, 123, 243, 1)",
			scale: 1,
			duration: 0.25,
			ease: "power1.out"
		});
	};

	const handleAnchorMouseDown = (index: number) => {
		gsap.to(linksRefs[index], {
			scale: 0.9,
			duration: 0.15,
			ease: "power1.out"
		});
	};

	const handleAnchorMouseUp = (index: number) => {
		gsap.to(linksRefs[index], {
			scale: 1.2,
			duration: 0.15,
			ease: "power1.out"
		});
	};

	const handleAnchorTouchStart = (index: number) => {
		gsap.to(linksRefs[index], {
			backgroundColor: "rgba(76, 123, 243, 1)",
			borderColor: "rgba(76, 123, 243, 1)",
			color: "rgba(255, 255, 255, 1)",
			scale: 0.9,
			duration: 0.15,
			ease: "power1.out"
		});
	};

	const handleAnchorTouchEnd = (index: number) => {
		gsap.to(linksRefs[index], {
			backgroundColor: "rgba(0, 0, 0, 0)",
			borderColor: "rgba(76, 123, 243, 0.15)",
			color: "rgba(76, 123, 243, 1)",
			scale: 1,
			duration: 0.15,
			ease: "power1.out"
		});
	};

	return (
		<ul class={finalProps.classes + " social-links-list"}>
			<For each={socialLinks}>
				{({ href, name, Icon }, index) => (
					<li class="social-links-list__list-item">
						<a
							onMouseEnter={() => handleAnchorMouseEnter(index())}
							onMouseLeave={() => handleAnchorMouseLeave(index())}
							onMouseDown={() => handleAnchorMouseDown(index())}
							onMouseUp={() => handleAnchorMouseUp(index())}
							onTouchStart={() => handleAnchorTouchStart(index())}
							onTouchEnd={() => handleAnchorTouchEnd(index())}
							ref={(ref) =>
								createRef({
									refs: linksRefs,
									ref,
									index: index()
								})
							}
							class="social-links-list__link"
							href={href}
							target="_blank"
						>
							<span class="visually-hidden">{name}</span>
							<Icon />
						</a>
					</li>
				)}
			</For>
		</ul>
	);
};
