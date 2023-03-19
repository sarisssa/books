import { Book } from "../../database";
import { IBook } from "../../models";

export async function getBook(id: Pick<IBook, "id">): Promise<IBook | null> {
  return Book.findById(id);
}
