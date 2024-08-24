import { postData } from "@shared/api";

type CreateNotificationParameters = {
	email: string;
};

export const createNotification = async ({ email }: CreateNotificationParameters) => {
	try {
		const response = await postData("/api/notification", {
			email: email
		});

		if (!response.ok) {
			const errorText = await response.text();
			throw new Error(
				`Failed to send email data. Status: ${response.status}. Message: ${errorText || "Unknown error"}`
			);
		}

		const contentType = response.headers.get("Content-Type");

		if (!contentType || !contentType.includes("application/json")) {
			throw new Error("Expected JSON response but received a different format.");
		}

		return await response.json();
	} catch (error) {
		console.error("An error occurred while sending the user data:", error);
		throw error;
	}
};
