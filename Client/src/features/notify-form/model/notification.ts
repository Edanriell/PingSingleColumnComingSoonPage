interface INotification {
	id: number;
	email: string;
}

export class Notification {
	private readonly _id: number;
	private readonly _email: string;

	constructor(notification: INotification) {
		this._id = notification.id;
		this._email = notification.email;
	}

	get id(): number {
		return this._id;
	}

	get email() {
		return this._email;
	}
}
