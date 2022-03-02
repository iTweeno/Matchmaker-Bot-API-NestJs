import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import GuildsController from "../controllers/guilds";
import GuildsService from "../services/guilds";
import { Channels, ChannelsSchema } from "../schemas/channels";

@Module({
	imports: [MongooseModule.forFeature([{ name: Channels.name, schema: ChannelsSchema }])],
	controllers: [GuildsController],
	providers: [GuildsService],
})
export default class GuildsModule {}
