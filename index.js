import express from "express";
import shortenRoute from "./routes/shorten.js";
import { connectRedis } from "./services/redisClient.js";

const app = express();
app.use(express.json());

connectRedis()
  .then(() => {
    app.use("/", shortenRoute);

    const PORT = 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to Redis:", err);
  });
