import {
  Injectable,
  ConflictException,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./user.model";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = await this.userModel.create(createUserDto as any);
      return user;
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        throw new ConflictException("Username or email already exists");
      }
      throw error;
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return this.userModel.findAll({
        attributes: { exclude: ["password"] },
      });
    } catch (error) {
      throw error;
    }
  }

  async findByUsername(username: string): Promise<User> {
    try {
      return this.userModel.findOne({ where: { username } });
    } catch (error) {
      throw error;
    }
  }

  async findByEmail(email: string): Promise<User> {
    try {
      return this.userModel.findOne({ where: { email } });
    } catch (error) {
      throw error;
    }
  }
}
