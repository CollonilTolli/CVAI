import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UserService {
  constructor(@Inject('USER_SERVICE') private readonly userClient: ClientKafka) {}

  // Метод вызывается при инициализации приложения для подписки на темы Kafka
  async onModuleInit() {
    // Подписываемся на все темы, которые будем использовать
    this.userClient.subscribeToResponseOf('get_user');
    this.userClient.subscribeToResponseOf('create_user');
    this.userClient.subscribeToResponseOf('update_user');
    this.userClient.subscribeToResponseOf('delete_user');

    await this.userClient.connect();
  }

  // Получить пользователя по ID
  async getUser(id: number) {
    return firstValueFrom(this.userClient.send('get_user', { id }));
  }

  // Создать нового пользователя
  async createUser(createUserDto: { name: string; email: string }) {
    return firstValueFrom(this.userClient.send('create_user', createUserDto));
  }

  // Обновить существующего пользователя
  async updateUser(id: number, updateUserDto: { name?: string; email?: string }) {
    return firstValueFrom(
      this.userClient.send('update_user', { id, ...updateUserDto }),
    );
  }

  // Удалить пользователя
  async deleteUser(id: number) {
    return firstValueFrom(this.userClient.send('delete_user', { id }));
  }
}