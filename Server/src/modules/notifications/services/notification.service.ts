import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";

import { PrismaService } from "../../prisma/prisma.service";
import { LoggerService } from "../../logger/services";
import { NotificationDto } from "../dtos";

@Injectable()
export class NotificationService {
	private readonly logger = new LoggerService(NotificationService.name);

	constructor(private prisma: PrismaService) {}

	async getNotification(id: number): Promise<NotificationDto> {
		const notification = await this.prisma.notification.findUnique({
			where: { id }
		});

		if (!notification) {
			this.logger.error(`Notification with ID ${id} was not found.`, NotificationService.name);
			throw new NotFoundException(`Notification with ID ${id} was not found.`, {
				cause: new Error(),
				description: `Notification with ID ${id} does not exist in the database.`
			});
		}

		return new NotificationDto(notification);
	}

	async getNotifications(): Promise<NotificationDto[]> {
		const notificationsCount = await this.prisma.notification.count();

		if (notificationsCount === 0) {
			this.logger.error(`Any notifications were not found.`, NotificationService.name);
			throw new NotFoundException("Notifications were not found.", {
				cause: new Error(),
				description: "There are no notifications in database."
			});
		}

		const notifications = await this.prisma.notification.findMany();

		return notifications.map((notification) => {
			new NotificationDto(notification);
		});
	}

	async createNotification(data: NotificationDto): Promise<NotificationDto> {
		try {
			const newNotification = await this.prisma.notification.create({
				data
			});
			this.logger.log(
				`Notification created with ID ${newNotification.id}.`,
				NotificationService.name
			);
			return new NotificationDto(newNotification);
		} catch (error) {
			this.logger.error("Failed to create notification.", NotificationService.name);
			throw new BadRequestException("Unable to create notification.", {
				cause: error,
				description: "There was an issue with the provided data."
			});
		}
	}

	async deleteNotification(id: number): Promise<void> {
		const notification = await this.prisma.notification.findUnique({
			where: { id }
		});

		if (!notification) {
			this.logger.error(`Notification with ID ${id} was not found.`, NotificationService.name);
			throw new NotFoundException(`Notification with ID ${id} was not found.`, {
				cause: new Error(),
				description: `Notification with ID ${id} does not exist in the database.`
			});
		}

		await this.prisma.notification.delete({
			where: { id }
		});

		this.logger.log(`Notification with ID ${id} has been deleted.`, NotificationService.name);
	}
}
