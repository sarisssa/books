import { Request, Router } from "express";
import { IBook } from "../../models";
import { addBook, getBook } from "../../services/books";

const router = Router();

type ReqQuery = { id: Pick<IBook, "id"> };

type SomeHandlerRequest = Request<any, any, any, ReqQuery>;

router.get("/", async (req: SomeHandlerRequest, res) => {
  const { id } = req.query;
  let book = await getBook(id);
  res.status(200).send(book);
});

router.post("/", async (req, res) => {
  const { author, title, genre, pubYear } = req.body;

  if (!author || !title || !genre || !pubYear) {
    res.status(400).send();
  }

  const book = await addBook({ author, title, genre, pubYear });

  res.status(201).send(book);
});

export default router;
