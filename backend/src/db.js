
import mongoose from "mongoose";


export const connectDb = async () => {
  try {
    // Connect to client
    mongoose.connect(
      process.env.MONGO_URI,
      {
        useNewUrlParser: true,
        
      }
    );
    console.log("Connected To DB 💾");
  } catch (error) {
    console.error(error);
    client.close();
  }
};
