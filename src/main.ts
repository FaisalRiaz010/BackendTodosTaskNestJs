/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   // Swagger setup
   const config = new DocumentBuilder()
   .setTitle('Todo Application')
   .setDescription('API for managing todos')
   .setVersion('1.0')
   .addTag('todos')
   .build();
 const document = SwaggerModule.createDocument(app, config);
 SwaggerModule.setup('api', app, document);
 await app.listen(3000);

}
bootstrap();
