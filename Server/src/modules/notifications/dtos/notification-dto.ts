export class NotificationDto {
	public id;
	public email;

	constructor(notification) {
		this.id = notification.id;
		this.email = notification.email;
	}
}
