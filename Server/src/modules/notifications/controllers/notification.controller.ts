import { Body, Controller, Delete, Get, Ip, Param, ParseIntPipe, Post } from "@nestjs/common";
import { Throttle } from "@nestjs/throttler";

import { NotificationService } from "../services";
import { LoggerService } from "../../logger/services";
import { CreateNotificationRequestDto } from "../dtos/create-notification-request-dto";

@Controller()
export class NotificationController {
	private readonly logger = new LoggerService(NotificationController.name);

	constructor(private readonly notificationService: NotificationService) {}

	@Throttle({ short: { ttl: 1000, limit: 1 } })
	@Get("notification/:id")
	async getNotification(@Param("id", ParseIntPipe) id: number, @Ip() ip: string) {
		this.logger.log(
			`Notification data requested for ID ${id} from IP: ${ip}`,
			NotificationController.name
		);
		return await this.notificationService.getNotification(id);
	}

	@Throttle({ short: { ttl: 1000, limit: 1 } })
	@Get("notifications")
	async getNotifications(@Ip() ip: string) {
		this.logger.log(`Post data requested from ip:\t${ip}`, NotificationController.name);
		return await this.notificationService.getNotifications();
	}

	@Throttle({ short: { ttl: 1000, limit: 1 } })
	@Post("notification")
	async createNotification(@Body() data: CreateNotificationRequestDto, @Ip() ip: string) {
		this.logger.log(
			`Create notification request received from IP: ${ip}`,
			NotificationController.name
		);
		return await this.notificationService.createNotification(data);
	}

	@Throttle({ short: { ttl: 1000, limit: 1 } })
	@Delete("notification/:id")
	async deleteNotification(@Param("id", ParseIntPipe) id: number, @Ip() ip: string) {
		this.logger.log(
			`Delete notification request for ID ${id} received from IP: ${ip}`,
			NotificationController.name
		);
		return await this.notificationService.deleteNotification(id);
	}
}
