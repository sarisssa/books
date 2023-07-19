import { Request, Router } from "express";
import { addBook, deleteBook, getBook, updateBook } from "../../services/books";

const router = Router();

type ReqQuery = { id: string };

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

router.put("/", async (req, res) => {
  const id = req.query.id as string;
  const { author, title, genre, pubYear } = req.body;

  if (!id) {
    res.status(400).send();
    return;
  }

  const book = await updateBook({ id, author, title, genre, pubYear });

  res.status(201).send(book);
});

router.delete("/", async (req, res) => {
  const id = req.query.id as string;

  if (!id) {
    res.status(400).send();
    return;
  }

  const book = await deleteBook(id);

  res.status(200).send(book);
});

export default router;
