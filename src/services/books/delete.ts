import { BookModel } from "../../database";

export async function deleteBook(bookId: string) {
  return BookModel.findByIdAndDelete(bookId);
}
