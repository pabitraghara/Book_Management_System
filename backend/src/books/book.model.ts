import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import { User } from "../users/user.model";

@Table({
  tableName: "books",
  timestamps: true,
})
export class Book extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  author: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  isbn: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  genre: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  publishedYear: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  publisher: string;

  @Column({
    type: DataType.ENUM("available", "borrowed", "reserved"),
    defaultValue: "available",
  })
  status: "available" | "borrowed" | "reserved";

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId: string;

  @BelongsTo(() => User)
  user: User;
}
