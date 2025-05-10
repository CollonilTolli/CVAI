import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DataSource } from 'typeorm';
import {env} from "../../../../packages/environment/env"

export const typeOrmConfig = {
  type: env.backend.db.type,
  host: env.backend.db.host,
  port: env.backend.db.port,
  username: env.backend.db.user ,
  password: env.backend.db.password,
  database: env.backend.db.name,
  entities: [User],
  synchronize: true,
};

export const DatabaseModule = TypeOrmModule.forRoot(typeOrmConfig);

// Create and export the data source for use in services
export const AppDataSource = new DataSource(typeOrmConfig);
