import { Module } from "@nestjs/common";
import HealthzController from "src/controllers/healthz";

@Module({
	controllers: [HealthzController],
})
export default class HealthzModule {}
