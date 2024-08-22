import { NestFactory } from "@nestjs/core";
import helmet from "helmet";
import * as compression from "compression";
import type { NestExpressApplication } from "@nestjs/platform-express";
import { ConfigService } from "@nestjs/config";

import { corsOptions, httpsConfig } from "./config";
import { AppModule } from "./app.module";

const startServer = async () => {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);

	const configService = app.get(ConfigService);

	app.enableCors(corsOptions);
	app.use(compression());
	app.useBodyParser("json", { limit: "50kb" });
	app.use(helmet());
	app.use(httpsConfig);
	app.setGlobalPrefix("api");

	await app.listen(configService.get<number>("PORT") || 3000);
};

startServer();
