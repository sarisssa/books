import { BookModel } from "../../database";
import { IBook } from "../../models";

export async function getBook(id: string): Promise<IBook | null> {
  return BookModel.findById(id);
}
