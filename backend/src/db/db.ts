import mongoose from "mongoose";

const connectedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("MongoDB connect");
  } catch (error) {
    console.log("MongoDB Connection Error", error);
  }
};

export default connectedDatabase;
