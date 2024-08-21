import "./social-links.less";

import { Component, mergeProps } from "solid-js";

import { Icon } from "@shared/ui/icon/ui";

type SocialLinksListProps = {
	classes?: string;
};

export const SocialLinksList: Component<SocialLinksListProps> = (props) => {
	const finalProps = mergeProps({ classes: "" }, props);

	return (
		<ul class={finalProps.classes + " social-links-list"}>
			<li class="social-links-list__list-item">
				<a class="social-links-list__link" href="#" target="_blank">
					<span class="visually-hidden">Facebook profile</span>
					<Icon type="facebook" />
				</a>
			</li>
			<li class="social-links-list__list-item">
				<a class="social-links-list__link" href="#" target="_blank">
					<span class="visually-hidden">Twitter profile</span>
					<Icon type="twitter" />
				</a>
			</li>
			<li class="social-links-list__list-item">
				<a class="social-links-list__link" href="#" target="_blank">
					<span class="visually-hidden">Instagram profile</span>
					<Icon type="instagram" />
				</a>
			</li>
		</ul>
	);
};
