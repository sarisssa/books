import { BookModel } from "../../database";
import { IBook } from "../../models";

export async function addBook(book: Omit<IBook, "id">): Promise<IBook> {
  return new BookModel(book).save();
}
