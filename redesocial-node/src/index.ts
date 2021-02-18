import { userRouter } from "./router/UserRouter";
import { friendRouter } from "./router/FriendRouter";
import dotenv from "dotenv";
import express from "express";
import { AddressInfo } from "net";
import { PostRouter } from "./router/PostRouter";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/friend", friendRouter);
app.use("/create", PostRouter);
app.use("/user", userRouter);
app.use("/posts", PostRouter);

const server = app.listen(process.env.PORT || 3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost:${address.port}`);
  } else {
    console.error(`Failure upon starting server.`);
  }
});
