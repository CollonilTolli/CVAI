import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Настройка микросервиса с Kafka
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'user-consumer',
      },
    },
  });

  // Запуск микросервиса
  await app.startAllMicroservices();
  
  // Запуск HTTP сервера (опционально)
  await app.listen(3001);
  console.log('Микросервис пользователей запущен');
}
bootstrap();