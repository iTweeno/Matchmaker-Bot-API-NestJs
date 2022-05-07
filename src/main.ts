import fastifyCookie from "fastify-cookie";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import rateLimit from "fastify-rate-limit";
import { readFileSync } from "fs";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import { NestFactory } from "@nestjs/core";
import { VersioningType } from "@nestjs/common";
import AppModule from "./app";

(async () => {
	const app = await NestFactory.create<NestFastifyApplication>(
		AppModule,
		new FastifyAdapter(
			process.env.NODE_ENV === "prod"
				? {}
				: {
						https: {
							key: readFileSync("./cert/cert.key"),
							cert: readFileSync("./cert/cert.pem"),
						},
				  }
		)
	);

	app.register(rateLimit, {
		max: 50,
		timeWindow: "1 minute",
	});

	app.enableCors({ credentials: true, origin: `https://${process.env.HOSTNAME}` });

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

	app.setGlobalPrefix(process.env.NODE_ENV === "prod" ? "" : "/api");

	const document = SwaggerModule.createDocument(app, config);

	SwaggerModule.setup("api", app, document);

	await app.listen(8080, "0.0.0.0");

	console.log(`Application is running on: ${await app.getUrl()}`);
})();
