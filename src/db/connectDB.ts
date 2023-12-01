import mongoose from "mongoose";

const connectDB = (mongoURI: string) => {
  mongoose.connect(
    mongoURI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("connected to MongoDB");
      }
    }
  );
};

export default connectDB;
