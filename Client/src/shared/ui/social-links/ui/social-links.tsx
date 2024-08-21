import "./social-links.less";

import { Component, For, mergeProps } from "solid-js";

import { Icon } from "@shared/ui/icon/ui";

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

	return (
		<ul class={finalProps.classes + " social-links-list"}>
			<For each={socialLinks}>
				{({ href, name, Icon }, _) => (
					<li class="social-links-list__list-item">
						<a class="social-links-list__link" href={href} target="_blank">
							<span class="visually-hidden">{name}</span>
							<Icon />
						</a>
					</li>
				)}
			</For>
		</ul>
	);
};
