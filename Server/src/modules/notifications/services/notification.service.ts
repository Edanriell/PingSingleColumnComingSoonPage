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
			this.logger.error(
				`Notification with ID ${id} was not found in the database.`,
				NotificationService.name
			);
			throw new NotFoundException(`Notification not found.`, {
				cause: new Error(`Notification with ID ${id} was not located in the database.`),
				description: `The requested notification with ID ${id} does not exist in the system. Please verify the ID and try again.`
			});
		}

		return new NotificationDto(notification);
	}

	async getNotifications(): Promise<NotificationDto[]> {
		const notificationsCount = await this.prisma.notification.count();

		if (notificationsCount === 0) {
			this.logger.error("No notifications were found in the database.", NotificationService.name);
			throw new NotFoundException("No notifications available.", {
				cause: new Error("Database query returned zero results."),
				description:
					"The system could not retrieve any notifications because the database is currently empty."
			});
		}

		const notifications = await this.prisma.notification.findMany();

		return notifications.map((notification) => new NotificationDto(notification));
	}

	async createNotification(data: NotificationDto): Promise<NotificationDto> {
		try {
			const newNotification = await this.prisma.notification.create({
				data
			});
			this.logger.log(
				`Notification successfully created with ID ${newNotification.id}.`,
				NotificationService.name
			);
			return new NotificationDto(newNotification);
		} catch (error) {
			this.logger.error(
				"Failed to create the notification due to an issue with the provided data.",
				NotificationService.name
			);
			throw new BadRequestException("Notification creation failed.", {
				cause: error,
				description:
					"The system encountered an issue while attempting to create the notification. Please ensure all required data is correct and try again."
			});
		}
	}

	async deleteNotification(id: number): Promise<void> {
		const notification = await this.prisma.notification.findUnique({
			where: { id }
		});

		if (!notification) {
			this.logger.error(
				`Notification with ID ${id} was not found in the database.`,
				NotificationService.name
			);
			throw new NotFoundException(`Notification not found.`, {
				cause: new Error(`Notification with ID ${id} does not exist in the database.`),
				description: `The requested notification with ID ${id} could not be deleted because it does not exist in the system. Please verify the ID and try again.`
			});
		}

		await this.prisma.notification.delete({
			where: { id }
		});

		this.logger.log(
			`Notification with ID ${id} was successfully deleted.`,
			NotificationService.name
		);
	}
}
