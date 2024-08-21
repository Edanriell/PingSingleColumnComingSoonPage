import "./footer.less";

import { Component } from "solid-js";

import { SocialLinksList } from "@shared/ui/social-links/ui";

export const Footer: Component = () => {
	return (
		<footer class="footer">
			<SocialLinksList classes="footer__social-links-list" />
			<small class="footer__text">© Copyright Ping. All rights reserved.</small>
		</footer>
	);
};
