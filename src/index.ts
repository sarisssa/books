import dotenv from "dotenv";
import express, { Express } from "express";
import mongoose from "mongoose";
import "./database/config";
import booksRoute from "./routes/books";

dotenv.config();

const app: Express = express();
const port = process.env.PORT!;
const mongoDbUri = process.env.MONGODB_URI!;

if (!port || !mongoDbUri) process.exit(1);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
app.use(express.json());
app.use("/books", booksRoute);

// app.options("*", cors());

async function main() {
  try {
    // Setup connection
    await mongoose.connect(mongoDbUri);

    app.listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

main();
