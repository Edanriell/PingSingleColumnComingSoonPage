import { Accessor, Setter } from "solid-js";

type validateEmailParameters = {
	email: Accessor<string>;
	emailValidationStateSetter: Setter<"valid" | "invalid" | "idle">;
	errorMessageSetter: Setter<string | null>;
	successMessageSetter: Setter<string | null>;
};

export const validateEmail = ({
	email,
	emailValidationStateSetter,
	errorMessageSetter,
	successMessageSetter
}: validateEmailParameters) => {
	const emailValue = email().trim();

	if (!emailValue || emailValue.length === 0) {
		errorMessageSetter("Email cannot be empty");
		emailValidationStateSetter("invalid");
		successMessageSetter(null);
		return false;
	}

	const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	if (!emailPattern.test(emailValue)) {
		errorMessageSetter("Please provide a valid email address");
		emailValidationStateSetter("invalid");
		successMessageSetter(null);
		return false;
	}

	errorMessageSetter(null);
	emailValidationStateSetter("valid");
	successMessageSetter(null);
	return true;
};
