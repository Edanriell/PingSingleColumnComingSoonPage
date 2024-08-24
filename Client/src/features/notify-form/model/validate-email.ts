import { Accessor, Setter } from "solid-js";

type validateEmailParameters = {
	email: Accessor<string>;
	emailValidationStateSetter: Setter<"valid" | "invalid">;
	errorMessageSetter: Setter<string | null>;
};

export const validateEmail = ({
	email,
	emailValidationStateSetter,
	errorMessageSetter
}: validateEmailParameters) => {
	const emailValue = email().trim();

	if (!emailValue || emailValue.length === 0) {
		errorMessageSetter("Email cannot be empty");
		emailValidationStateSetter("invalid");
		return false;
	}

	const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	if (!emailPattern.test(emailValue)) {
		errorMessageSetter("Please provide a valid email address");
		emailValidationStateSetter("invalid");
		return false;
	}

	errorMessageSetter(null);
	emailValidationStateSetter("valid");
	return true;
};
