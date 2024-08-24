import { Setter } from "solid-js";

type validateNotificationFormParameters = {
	inputsValidationStates: Array<() => string>;
	formValidationStateSetter: Setter<"valid" | "invalid">;
};

export const validateNotificationForm = ({
	inputsValidationStates,
	formValidationStateSetter
}: validateNotificationFormParameters) => {
	inputsValidationStates.forEach((validationState) => {
		if (validationState() === "invalid") {
			formValidationStateSetter("invalid");
			return false;
		}
	});
	formValidationStateSetter("valid");
	return true;
};
