import { Injectable } from '@nestjs/common';

// Интерфейс для пользователя
export interface User {
  id: number;
  name: string;
  email: string;
}

// Интерфейс для создания пользователя
export interface CreateUserDto {
  name: string;
  email: string;
}

// Интерфейс для обновления пользователя
export interface UpdateUserDto {
  name?: string;
  email?: string;
}

@Injectable()
export class UserService {
  // Временное хранилище пользователей (в реальном приложении будет база данных)
  private users: User[] = [];
  private nextId = 1;

  // Получить пользователя по ID
  getUser(id: number): User | undefined {
    return this.users.find(user => user.id === id);
  }

  // Создать нового пользователя
  createUser(createUserDto: CreateUserDto): User {
    const newUser: User = {
      id: this.nextId++,
      ...createUserDto,
    };
    
    this.users.push(newUser);
    return newUser;
  }

  // Обновить существующего пользователя
  updateUser(id: number, updateUserDto: UpdateUserDto): User | undefined {
    const userIndex = this.users.findIndex(user => user.id === id);
    
    if (userIndex === -1) {
      return undefined;
    }
    
    const updatedUser = {
      ...this.users[userIndex],
      ...updateUserDto,
    };
    
    this.users[userIndex] = updatedUser;
    return updatedUser;
  }

  // Удалить пользователя
  deleteUser(id: number): boolean {
    const initialLength = this.users.length;
    this.users = this.users.filter(user => user.id !== id);
    
    return initialLength !== this.users.length;
  }
}