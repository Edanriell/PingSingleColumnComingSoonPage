import "./input.less";

import { Component, mergeProps } from "solid-js";

type InputProps = {
	name: string;
	description: string;
	type?: "email" | "password" | "text";
	placeholder?: string;
	classes?: string;
	onInputChange?: (event: any) => void;
};

export const Input: Component<InputProps> = (props) => {
	const finalProps = mergeProps({ type: "text", placeholder: "", classes: "" }, props);

	return (
		<div class="input__field">
			<label class="visually-hidden" for={finalProps.name}>
				{finalProps.description}
			</label>
			<input
				class={finalProps.classes + " input"}
				type={finalProps.type}
				name={finalProps.name}
				id={finalProps.name}
				placeholder={finalProps.placeholder}
				onChange={finalProps.onInputChange}
			/>
		</div>
	);
};
