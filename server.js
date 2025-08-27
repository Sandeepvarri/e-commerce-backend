import express from "express";
import "dotenv/config";
import connectDB from "./db/connect.js";
import authRouter from "./routes/authRouter.js";
import cookieParser from "cookie-parser";
import { errorHandlerMiddleware } from "./middleware/errorHandler.js";
import notFound from "./middleware/notFound.js";
import productRouter from "./routes/productRouter.js";
import reviewRouter from "./routes/reviewRouter.js";
import orderRouter from "./routes/orderRouter.js";
import uploadRouter from "./routes/uploadRouter.js";

const app = express();

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/upload", uploadRouter);

app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  await connectDB(process.env.MONGO_URI);
  await app.listen(port, () => {
    console.log(`Server is listening at port ${port}`);
  });
};

start();
