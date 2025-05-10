import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../database/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(userData: {
    email: string;
    phone: string;
    username: string;
    password: string;
  }) {
    const hashedPassword = await argon2.hash(userData.password);

    try {
      const newUser = await this.userRepository.save({
        ...userData,
        password: hashedPassword,
      });

      return this.generateToken(newUser);
    } catch (error) {
      if (error.code === '23505') {
        throw new UnauthorizedException(
          'User with these credentials already exists',
        );
      }
      throw error;
    }
  }

  async login(login: string, password: string) {
    const user = await this.userRepository.findOne({
      where: [{ email: login }, { phone: login }, { username: login }],
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateToken(user);
  }

  private generateToken(user: { id: string; email: string }) {
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async verifyToken(token: string) {
    try {
      const payload = await this.jwtService.verifyAsync(token);
      return { sub: payload.sub, email: payload.email };
    } catch {
      throw new Error('Invalid token');
    }
  }
}
