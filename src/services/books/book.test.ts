import { IBook } from "../../models";
import { clearDatabase, connect, disconnect } from "../../test";
import { addBook } from "./add";
import { deleteBook } from "./delete";
import { getBook } from "./get";
import { updateBook } from "./update";

describe("Single MongoMemoryServer", () => {
  beforeAll(() => connect());
  afterEach(() => clearDatabase());
  afterAll(() => disconnect());

  it("should successfully set & get information from the database", async () => {
    const bookParams = {
      author: "John Smith",
      genre: "Drama",
      pubYear: new Date(2020),
      title: "A Book",
    };

    const testBook = await addBook(bookParams);
    const addedBook = await getBook(testBook.id);

    expect(addedBook).toMatchObject(bookParams);
  });

  it("should successfully delete a record from the database", async () => {
    const bookParams = {
      author: "John Smith",
      genre: "Drama",
      pubYear: new Date(2020),
      title: "A Book",
    };
    const testBook = await addBook(bookParams);

    let deletedBook = await deleteBook(testBook.id);

    expect(deletedBook).not.toBeNull();
    expect(await getBook(deletedBook!.id)).toBeNull();
  });

  it("should successfully update a record from the database", async () => {
    const bookParams = {
      author: "John Smith",
      genre: "Drama",
      pubYear: new Date(2020),
      title: "A Book",
    };
    const testBook = await addBook(bookParams);

    const newBook: IBook = {
      id: testBook.id,
      author: "John Silver",
      genre: "Action",
      pubYear: new Date(2020),
      title: "A Very Good Book",
    };

    let updatedBook = await updateBook(newBook);

    expect(updatedBook).not.toBeNull();
    expect(await getBook(updatedBook!.id)).toMatchObject(newBook);
  });
});
