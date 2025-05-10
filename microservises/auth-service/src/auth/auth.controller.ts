import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('auth.register')
  async register(userData: {
    email: string;
    phone: string;
    username: string;
    password: string;
  }) {
    return this.authService.register(userData);
  }

  @MessagePattern('auth.login')
  async login(data: { login: string; password: string }) {
    return this.authService.login(data.login, data.password);
  }

  @MessagePattern('auth.verify-token')
  async verifyToken(data: { token: string }) {
    try {
      return await this.authService.verifyToken(data.token);
    } catch {
      throw new Error('Invalid token');
    }
  }
}
