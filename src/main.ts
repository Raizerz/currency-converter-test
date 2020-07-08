import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
function enableSwagger(app) {
  const swaggerUIEnabled: boolean = process.env.SWAGGER_UI_ENABLED ? JSON.parse(process.env.SWAGGER_UI_ENABLED) : false;

  if (swaggerUIEnabled) {
    // @ts-ignore
    const scheme: ('http' | 'https') = process.env.SWAGGER_UI_PROTOCOL;

    // @ts-ignore
    const options = new DocumentBuilder()
      .setTitle('Currency converter API')
      .setDescription('This API handles currency rate convertation')
      .setVersion('1.0.0')
      .setHost(process.env.SWAGGER_UI_HOST || '')
      .setSchemes(scheme)
      .setBasePath('')
      .build();
    const document = SwaggerModule.createDocument(app, options);
    const swaggerURIPath: string = `${process.env.APP_GLOBAL_PREFIX}/api`;
    SwaggerModule.setup(swaggerURIPath, app, document);
  }
}

async function bootstrap() {
  const cors: boolean = process.env.enableCORS ? JSON.parse(process.env.enableCORS) : false;


  const app = await NestFactory.create(AppModule, { cors });

  enableSwagger(app);

  console.log('The application is launching on port ', process.env.APP_PORT);
  // @ts-ignore
  await app.listen(process.env.APP_PORT);
}

bootstrap();
