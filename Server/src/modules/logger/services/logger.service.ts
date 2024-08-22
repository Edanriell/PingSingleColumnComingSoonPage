import { ConsoleLogger, Injectable } from "@nestjs/common";
import * as fs from "fs";
import { promises as fsPromises } from "fs";
import * as path from "path";

@Injectable()
export class LoggerService extends ConsoleLogger {
	public log(message: any, context?: string) {
		const entry = `${context}\t${message}`;
		this.logToFile(entry);
		super.log(message, context);
	}

	public error(message: any, stackOrContext?: string) {
		const entry = `${stackOrContext}\t${message}`;
		this.logToFile(entry);
		super.error(message, stackOrContext);
	}

	public warn(message: any, context?: string) {
		const entry = `${context}\t${message}`;
		this.logToFile(entry);
		super.warn(message, context);
	}

	public fatal(message: any, stackOrContext?: string) {
		const entry = `${stackOrContext}\t${message}`;
		this.logToFile(entry);
		super.fatal(message, stackOrContext);
	}

	private async logToFile(entry: any) {
		const formattedEntry = `${Intl.DateTimeFormat("en-US", {
			dateStyle: "short",
			timeStyle: "short",
			timeZone: "America/Chicago"
		}).format(new Date())}\t${entry}\n`;

		try {
			if (!fs.existsSync(path.join(__dirname, "..", "..", "logs"))) {
				await fsPromises.mkdir(path.join(__dirname, "..", "..", "logs"));
			}
			await fsPromises.appendFile(
				path.join(__dirname, "..", "..", "logs", "myLogFile.log"),
				formattedEntry
			);
		} catch (e) {
			if (e instanceof Error) console.error(e.message);
		}
	}
}
