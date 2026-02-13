import { MongoClient } from "mongodb";

let clientPromise: Promise<MongoClient>;

function getClientPromise(): Promise<MongoClient> {
  if (clientPromise) return clientPromise;

  const uri = process.env.MONGODB_URI!;

  if (process.env.NODE_ENV === "development") {
    const globalWithMongo = global as typeof globalThis & { _mongoClientPromise?: Promise<MongoClient> };
    if (!globalWithMongo._mongoClientPromise) {
      globalWithMongo._mongoClientPromise = new MongoClient(uri).connect();
    }
    clientPromise = globalWithMongo._mongoClientPromise;
  } else {
    clientPromise = new MongoClient(uri).connect();
  }

  return clientPromise;
}

export default getClientPromise;
