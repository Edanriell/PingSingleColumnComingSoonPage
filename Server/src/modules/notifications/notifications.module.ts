import { Module } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";
import { NotificationService } from "./services";
import { NotificationController } from "./controllers";

@Module({
	controllers: [NotificationController],
	providers: [NotificationService, PrismaService]
})
export class NotificationsModule {}
