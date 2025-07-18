import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from "@nestjs/swagger";
import { BooksService } from "./books.service";
import { CreateBookDto } from "./dto/create-book.dto";
import { UpdateBookDto } from "./dto/update-book.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import e from "express";

@ApiTags("books")
@Controller("books/api/v1")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post("add-book")
  @ApiOperation({ summary: "Create a new book" })
  @ApiResponse({ status: 201, description: "Book created successfully" })
  @ApiResponse({
    status: 409,
    description: "Book with this ISBN already exists",
  })
  createBook(@Body() createBookDto: CreateBookDto, @Request() req) {
    try {
      return this.booksService.createBook(createBookDto, req.user.id);
    } catch (error) {
      error.status = 409; // Set the HTTP status code to 409 Conflict
      error.message = "Book with this ISBN already exists"; // Customize the message as needed
      throw error;
    }
  }

  @Get("all-books")
  @ApiOperation({ summary: "Get all books" })
  @ApiResponse({ status: 200, description: "List of books" })
  @ApiQuery({
    name: "my",
    required: false,
    description: "Get only current user books",
  })
  findAllBooks(@Request() req, @Query("my") my?: string) {
    try {
      const userId = my === "true" ? req.user.id : undefined;
      return this.booksService.findAllBooks(userId);
    } catch (error) {
      error.status = 404; // Set the HTTP status code to 404 Not Found
      error.message =
        "No books found for the specified criteria or no books exist."; // Customize the message as needed
      throw error;
    }
  }

  @Get("search")
  @ApiOperation({ summary: "Search books" })
  @ApiResponse({ status: 200, description: "Search results" })
  @ApiQuery({ name: "q", required: true, description: "Search query" })
  search(@Query("q") query: string) {
    try {
      return this.booksService.searchBooks(query);
    } catch (error) {
      error.status = 404; // Set the HTTP status code to 404 Not Found
      error.message =
        "No books found for the specified criteria or no books exist."; // Customize the message as needed
      throw error;
    }
  }

  @Get(":id")
  @ApiOperation({ summary: "Get book by ID" })
  @ApiResponse({ status: 200, description: "Book details" })
  @ApiResponse({ status: 404, description: "Book not found" })
  findOne(@Param("id") id: string) {
    try {
      return this.booksService.findOne(id);
    } catch (error) {
      error.status = 404; // Set the HTTP status code to 404 Not Found
      error.message =
        "No books found for the specified criteria or no books exist."; // Customize the message as needed
      throw error;
    }
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update book by ID" })
  @ApiResponse({ status: 200, description: "Book updated successfully" })
  @ApiResponse({ status: 404, description: "Book not found" })
  @ApiResponse({
    status: 403,
    description: "Forbidden - You can only update your own books",
  })
  update(
    @Param("id") id: string,
    @Body() updateBookDto: UpdateBookDto,
    @Request() req
  ) {
    return this.booksService.updateBook(
      id,
      updateBookDto,
      req.user.id,
      req.user.role
    );
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete book by ID" })
  @ApiResponse({ status: 200, description: "Book deleted successfully" })
  @ApiResponse({ status: 404, description: "Book not found" })
  @ApiResponse({
    status: 403,
    description: "Forbidden - You can only delete your own books",
  })
  remove(@Param("id") id: string, @Request() req) {
    try {
      return this.booksService.removeBook(id, req.user.id, req.user.role);
    } catch (error) {
      error.status = 404; // Set the HTTP status code to 404 Not Found
      error.message =
        "No books found for the specified criteria or no books exist."; // Customize the message as needed
      throw error;
    }
  }
}
