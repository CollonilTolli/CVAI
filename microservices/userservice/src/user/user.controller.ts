import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService, User } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('get_user')
  getUser(@Payload() data: { id: number }): User | undefined {
    return this.userService.getUser(data.id);
  }

  @MessagePattern('create_user')
  createUser(@Payload() data: { name: string; email: string }) {
    return this.userService.createUser(data);
  }

  @MessagePattern('update_user')
  updateUser(@Payload() data: { id: number; name?: string; email?: string }) {
    return this.userService.updateUser(data.id, data);
  }

  @MessagePattern('delete_user')
  deleteUser(@Payload() data: { id: number }) {
    return this.userService.deleteUser(data.id);
  }
}