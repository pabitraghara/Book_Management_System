import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from "./users/users.module";
import { BooksModule } from "./books/books.module";
import { User } from "./users/user.model";
import { Book } from "./books/book.model";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.DATABASE_HOST || "localhost",
      port: parseInt(process.env.DATABASE_PORT) || 5432,
      username: process.env.DATABASE_USERNAME || "postgres",
      password: process.env.DATABASE_PASSWORD || "password",
      database: process.env.DATABASE_NAME || "book_management",
      models: [User, Book],
      autoLoadModels: true,
      synchronize: true,
      logging: false,
    }),
    UsersModule,
    BooksModule,
    AuthModule,
  ],
})
export class AppModule {}
