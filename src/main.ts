import fastifyCookie from "fastify-cookie";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import { NestFactory } from "@nestjs/core";
import { VersioningType } from "@nestjs/common";

import AppModule from "./app.module";

async function createAPIInstance() {
	const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

	app.enableCors({ credentials: true, origin: "http://localhost:3000" });

	app.register(fastifyCookie, {
		secret: process.env.COOKIES_TOKEN,
	});

	const config = new DocumentBuilder()
		.setTitle("Matchmaking API")
		.setDescription("api go brr")
		.setVersion("1.0")
		.addTag("matchmaking")
		.build();

	app.enableVersioning({
		type: VersioningType.URI,
		defaultVersion: "1",
	});

	app.setGlobalPrefix("/api");

	const document = SwaggerModule.createDocument(app, config);

	SwaggerModule.setup("swagger", app, document);

	await app.listen(3000, "0.0.0.0");

	console.log(`Application is running on: ${await app.getUrl()}`);
}
createAPIInstance();
