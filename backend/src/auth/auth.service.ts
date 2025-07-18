import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    try {
      let user = await this.usersService.findByUsername(username);

      if (!user) {
        user = await this.usersService.findByEmail(username);
      }

      if (user && (await user.comparePassword(password))) {
        const { password, ...result } = user.toJSON();
        return result;
      }
      return null;
    } catch (error) {
      error.message === "No user found with that username" ||
      error.message === "Incorrect password"
        ? null
        : error;
    }
  }

  async login(loginDto: LoginDto) {
    try {
      const user = await this.validateUser(
        loginDto.username,
        loginDto.password
      );
      if (!user) {
        throw new UnauthorizedException("Invalid credentials");
      }

      const payload = {
        username: user.username,
        sub: user.id,
        email: user.email,
        role: user.role,
      };

      return {
        access_token: this.jwtService.sign(payload),
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        },
      };
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  async register(registerDto: RegisterDto) {
    try {
      const user = await this.usersService.create(registerDto);
      const { password, ...result } = user.toJSON();

      const payload = {
        username: result.username,
        sub: result.id,
        email: result.email,
        role: result.role,
      };

      return {
        access_token: this.jwtService.sign(payload),
        user: result,
      };
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new ConflictException("Registration failed");
    }
  }

  // async getUserProfile(userId: string) {
  //   const user = await this.usersService.findOne(userId);
  //   if (!user) {
  //     throw new UnauthorizedException("Unauthorized");
  //   }
  //   return {
  //     username: user.username,
  //     email: user.email,
  //     name: `${user.firstName} ${user.lastName}`,
  //   };
  // }
}
