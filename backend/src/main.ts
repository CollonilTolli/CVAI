import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Настройка Kafka для взаимодействия с микросервисами
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'backend',
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'backend-consumer',
      },
    },
  });

  // Запуск микросервисов
  await app.startAllMicroservices();
  
  // Запуск HTTP сервера
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Бэкенд запущен на порту ${process.env.PORT ?? 3000}`);
}
bootstrap();
