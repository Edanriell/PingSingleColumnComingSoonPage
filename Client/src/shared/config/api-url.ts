import { getEnvVariable } from "../lib/functions";

export const apiUrl = getEnvVariable<string>("VITE_API_URL", {
	required: true,
	errorMessage: "API URL is missing. Please check your environment configuration."
});
