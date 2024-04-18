import mongoose, { connection } from "mongoose";

export async function connectToMongoDB() {
  try {
    mongoose.connect(process.env.MONGODB_URI);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connected");
    });

    connection.on("error", (error) => {
      console.log(
        "MongoDB connection error. Please make sure mongodb is running. " +
          error
      );
      process.exit();
    });
  } catch (error) {
    console.log("Error: ", error);
  }
}
