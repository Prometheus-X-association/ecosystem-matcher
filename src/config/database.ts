import mongoose from "mongoose";

export async function loadMongoose(isTest = false) {
  let mongoUri = `mongodb://${process.env.MONGO_HOST}:${
    process.env.MONGO_PORT
  }/${isTest ? process.env.MONGO_TEST_DATABASE : process.env.MONGO_DATABASE}`;

  if (process.env.MONGO_USERNAME && process.env.MONGO_PASSWORD) {
    mongoUri = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}`;
  }

  const connect = await mongoose.connect(mongoUri);
  const connection = connect.connection;
  connection.on(
    "error",
    // eslint-disable-next-line
    console.error.bind(console, "MongoDB connection error: ")
  );

  return connection;
}
