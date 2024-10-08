import "./notification-form.less";

import { Component, createSignal, mergeProps, Show } from "solid-js";

import { Input } from "@shared/ui/input/ui";
import { Button } from "@shared/ui/button/ui";

import { Notification, validateEmail, validateNotificationForm } from "../model";
import { createNotification } from "../api";
import { extractErrorMessage } from "../lib/functions";

type NotificationFormProps = {
	classes?: string;
};

export const NotificationForm: Component<NotificationFormProps> = (props) => {
	const finalProps = mergeProps({ classes: "" }, props);

	const [email, setEmail] = createSignal<string>("");
	const [emailValidationState, setEmailValidationState] = createSignal<
		"valid" | "invalid" | "idle"
	>("idle");
	const [formValidationState, setFormValidationState] = createSignal<"valid" | "invalid">(
		"invalid"
	);
	const [errorMessage, setErrorMessage] = createSignal<string | null>(null);
	const [successMessage, setSuccessMessage] = createSignal<string | null>(null);

	const handleEmailChange = (event: any) => {
		setEmail(event.target.value);

		validateEmail({
			email,
			emailValidationStateSetter: setEmailValidationState,
			errorMessageSetter: setErrorMessage,
			successMessageSetter: setSuccessMessage
		});

		validateNotificationForm({
			inputsValidationStates: [emailValidationState],
			formValidationStateSetter: setFormValidationState
		});
	};

	const handleNotificationFormSubmit = async (event: Event) => {
		event.preventDefault();

		setErrorMessage(null);
		setSuccessMessage(null);

		if (formValidationState() === "invalid") return;

		try {
			const response = await createNotification({
				email: email()
			});

			const createdNotification = new Notification(response);

			setSuccessMessage(`Email: ${createdNotification.email} has been successfully registered`);
		} catch (error) {
			if (error instanceof Error) {
				console.error("Error message:", error.message);

				const errorMessage = extractErrorMessage(error);

				setErrorMessage(errorMessage);
			} else {
				console.error("Unexpected error:", error);
			}
		}
	};

	return (
		<form
			onSubmit={handleNotificationFormSubmit}
			class={finalProps.classes + " notify-form"}
			method="post"
		>
			<Input
				name="email"
				description="Email address"
				type="email"
				placeholder="Your email address…"
				onInputChange={handleEmailChange}
				classes={emailValidationState() === "invalid" ? "input-invalid" : ""}
			/>
			<Show when={errorMessage()}>
				<div class="notify-form__message-wrapper">
					<p class="notify-form__message notify-form__message--color--festive-fennec">
						{errorMessage()}
					</p>
				</div>
			</Show>
			<Show when={successMessage()}>
				<div class="notify-form__message-wrapper">
					<p class="notify-form__message notify-form__message--color--ufo-green">
						{successMessage()}
					</p>
				</div>
			</Show>
			<Button
				isDisabled={formValidationState() !== "valid"}
				classes="notify-form__submit-button"
				type="submit"
			>
				Notify Me
			</Button>
		</form>
	);
};
