import { apiUrl } from "@shared/config";

export const postData = async (endpoint: string, body: unknown) =>
	await fetch(apiUrl + endpoint, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(body)
	});
