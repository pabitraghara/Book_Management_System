import {
  Injectable,
  NotFoundException,
  ConflictException,
  ForbiddenException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Book } from "./book.model";
import { User } from "../users/user.model";
import { CreateBookDto } from "./dto/create-book.dto";
import { UpdateBookDto } from "./dto/update-book.dto";

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book)
    private bookModel: typeof Book
  ) {}

  async createBook(
    createBookDto: CreateBookDto,
    userId: string
  ): Promise<Book> {
    try {
      const book = await this.bookModel.create({
        ...createBookDto,
        userId,
      });
      return book;
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        throw new ConflictException("Book with this ISBN already exists");
      }
      throw error;
    }
  }

  async findAllBooks(userId?: string): Promise<Book[]> {
    try {
      const whereClause = userId ? { userId } : {};
      return this.bookModel.findAll({
        where: whereClause,
        include: [
          {
            model: User,
            attributes: ["id", "username", "firstName", "lastName"],
          },
        ],
      });
    } catch (error) {
      error.message = "An error occurred while fetching books.";
    }
  }

  async findOne(id: string): Promise<Book> {
    try {
      const book = await this.bookModel.findByPk(id, {
        include: [
          {
            model: User,
            attributes: ["id", "username", "firstName", "lastName"],
          },
        ],
      });
      if (!book) {
        throw new NotFoundException("Book not found");
      }
      return book;
    } catch (error) {
      error.message = "An error occurred while fetching a book.";
    }
  }

  async updateBook(
    id: string,
    updateBookDto: UpdateBookDto,
    userId: string,
    userRole: string
  ): Promise<Book> {
    const book = await this.bookModel.findByPk(id);
    if (!book) {
      throw new NotFoundException("Book not found");
    }

    // Check if user owns the book or is an admin
    if (book.userId !== userId && userRole !== "admin") {
      throw new ForbiddenException("You can only update your own books");
    }

    try {
      await book.update(updateBookDto);
      return book;
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        throw new ConflictException("Book with this ISBN already exists");
      }
      throw error;
    }
  }

  async removeBook(
    id: string,
    userId: string,
    userRole: string
  ): Promise<void> {
    try {
      const book = await this.bookModel.findByPk(id);
      if (!book) {
        throw new NotFoundException("Book not found");
      }

      // Check if user owns the book or is an admin
      if (book.userId !== userId && userRole !== "admin") {
        throw new ForbiddenException("You can only delete your own books");
      }

      await book.destroy();
    } catch (error) {
      error.message = "An error occurred while deleting a book.";
    }
  }

  async searchBooks(query: string): Promise<Book[]> {
    try {
      return this.bookModel.findAll({
        where: {
          [require("sequelize").Op.or]: [
            { title: { [require("sequelize").Op.iLike]: `%${query}%` } },
            { author: { [require("sequelize").Op.iLike]: `%${query}%` } },
            { genre: { [require("sequelize").Op.iLike]: `%${query}%` } },
          ],
        },
        include: [
          {
            model: User,
            attributes: ["id", "username", "firstName", "lastName"],
          },
        ],
      });
    } catch (error) {
      error.message = "An error occurred while searching books.";
      error.status = 500;
      throw error;
    }
  }
}
