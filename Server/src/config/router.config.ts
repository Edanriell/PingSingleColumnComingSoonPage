import { Module } from "@nestjs/common";
import { RouterModule } from "@nestjs/core";

import { NotificationsModule } from "../modules";

@Module({
	imports: [
		NotificationsModule,
		RouterModule.register([
			{
				path: "",
				children: [NotificationsModule]
			}
		])
	]
})
export class RouterConfigModule {}
