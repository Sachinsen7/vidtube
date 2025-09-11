import dotenv from "dotenv";
import { app } from "./app.js";
import connectDatabase from "./db/index.js";

dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT || 8001;

connectDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is listening at ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Mongoose connection failed ", err);
    process.exit(1);
});
