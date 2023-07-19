import { model, Schema } from "mongoose";
import { IBook } from "../models";

const BookSchema = new Schema<IBook>({
  author: { type: String, required: true },
  title: { type: String, required: true },
  genre: { type: String, required: true },
  pubYear: { type: Date, required: true },
});

export const BookModel = model<IBook>("Books", BookSchema);
