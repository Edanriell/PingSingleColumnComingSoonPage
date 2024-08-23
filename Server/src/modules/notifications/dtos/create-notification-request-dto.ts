export class CreateNotificationRequestDto {
	public email;

	constructor(notification) {
		this.email = notification.email;
	}
}
