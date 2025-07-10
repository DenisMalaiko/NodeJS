import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  process.on('SIGINT', () => {
    console.log('Close server...');
    process.exit();
  });

  const settings = new DocumentBuilder()
    .setTitle('Mini Zipper API')
    .setDescription('Mini Zipper API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, settings);

  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
