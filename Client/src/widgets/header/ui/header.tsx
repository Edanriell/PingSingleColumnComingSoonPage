import "./header.less";

import { Component } from "solid-js";

export const Header: Component = () => {
	return (
		<header class="header">
			<picture>
				<source
					type="image/svg+xml"
					media="(min-width: 1440px)"
					srcset="/images/vector/logotype-lg.svg"
				/>
				<source
					type="image/svg+xml"
					media="(min-width: 375px)"
					srcset="/images/vector/logotype-sm.svg"
				/>
				<img
					class="header__logotype"
					src="/images/vector/logotype-sm.svg"
					alt="Ping company logotype"
				/>
			</picture>
		</header>
	);
};
