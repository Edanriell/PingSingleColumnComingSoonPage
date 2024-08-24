import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";

import { PrismaService } from "../../prisma/prisma.service";
import { LoggerService } from "../../logger/services";
import { NotificationDto } from "../dtos";
import { CreateNotificationRequestDto } from "../dtos/create-notification-request-dto";

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

	async createNotification(data: CreateNotificationRequestDto): Promise<NotificationDto> {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (!emailRegex.test(data.email)) {
			this.logger.error(`Invalid email format provided: ${data.email}.`, NotificationService.name);
			throw new BadRequestException(`Invalid email format: ${data.email}.`, {
				cause: new Error(`Provided email: ${data.email} does not match the standard email format.`),
				description: `The email address ${data.email} is not in a valid format. Please provide a correct email address and try again.`
			});
		}

		const existingNotification = await this.prisma.notification.findUnique({
			where: { email: data.email }
		});

		if (existingNotification) {
			this.logger.error(
				`Failed to create the notification. Email: ${data.email} is already registered.`,
				NotificationService.name
			);
			throw new BadRequestException(`Email: ${data.email} is already registered`, {
				cause: new Error(`Duplicate email: ${data.email} in the database.`),
				description: `The email address ${data.email} is already associated with an existing notification. Please use a different email address and try again.`
			});
		}

		const newNotification = await this.prisma.notification.create({
			data
		});
		this.logger.log(
			`Notification successfully created with ID ${newNotification.id}.`,
			NotificationService.name
		);
		return new NotificationDto(newNotification);
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
