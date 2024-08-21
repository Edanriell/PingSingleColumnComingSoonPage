import "./notify-form.less";

import { Component, mergeProps } from "solid-js";

import { Input } from "@shared/ui/input/ui";
import { Button } from "@shared/ui/button/ui";

type NotifyForm = {
	classes?: string;
};

export const NotifyForm: Component<NotifyForm> = (props) => {
	const finalProps = mergeProps({ classes: "" }, props);

	return (
		<form class={finalProps.classes + " notify-form"} method="post">
			<Input
				name="email"
				description="Email address"
				type="email"
				placeholder="Your email address…"
			/>
			<Button classes="notify-form__submit-button" type="submit">
				Notify Me
			</Button>
		</form>
	);
};
