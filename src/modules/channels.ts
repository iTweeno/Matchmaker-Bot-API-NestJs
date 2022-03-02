import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import ChannelsController from "../controllers/channels";
import ChannelsService from "../services/channels";
import { Channels, ChannelsSchema } from "../schemas/channels";

@Module({
	imports: [MongooseModule.forFeature([{ name: Channels.name, schema: ChannelsSchema }])],
	controllers: [ChannelsController],
	providers: [ChannelsService],
})
export default class ChannelsModule {}
