import { BookModel } from "../../database";
import { IBook } from "../../models";

export async function updateBook(book: IBook) {
  return BookModel.findByIdAndUpdate({ _id: book.id }, book, { new: true });
}
