import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

let mongoDb: MongoMemoryServer;

// Integrate ORM with in-memory DB
export const connect = async () => {
  mongoDb = await MongoMemoryServer.create();
  await mongoose.connect(mongoDb.getUri());
};

export const disconnect = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoDb.stop();
};

export const clearDatabase = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany();
  }
};
