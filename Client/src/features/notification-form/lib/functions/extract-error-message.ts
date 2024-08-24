export const extractErrorMessage = (error: Error) => {
	const match = error.message.match(/Message:\s*({.*})/);
	let errorMessage = "An unexpected error occurred.";

	if (match && match[1]) {
		try {
			const errorData = JSON.parse(match[1]);
			errorMessage = errorData.message || errorMessage;
		} catch (jsonError) {
			console.error("Failed to parse error message JSON:", jsonError);
		}
	}

	return errorMessage;
};
