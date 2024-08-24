type EnvVarOptions<T> = {
	defaultValue?: T;
	required?: boolean;
	parseAs?: "string" | "number" | "boolean";
	errorMessage?: string;
};

export function getEnvVariable<T extends string | number | boolean>(
	key: string,
	options: EnvVarOptions<T> = {}
): T {
	const {
		defaultValue,
		required = true,
		parseAs = "string",
		errorMessage
	}: EnvVarOptions<T> = options;

	let value = import.meta.env[key];

	if (value === undefined || value === null) {
		if (defaultValue !== undefined) {
			value = defaultValue as unknown as string;
		} else if (required) {
			throw new Error(errorMessage || `Environment variable ${key} is not set`);
		}
	}

	switch (parseAs) {
		case "number":
			return Number(value) as T;
		case "boolean":
			return (value === "true" || value === "1") as T;
		case "string":
		default:
			return value as unknown as T;
	}
}
