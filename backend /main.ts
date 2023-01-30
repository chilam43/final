import express from "express";
import cors from "cors";
import { userRoute } from "./Routes/userRoute";
import { uploadFileRoute } from "./Routes/uploadFileRoute";
import { roomInfoRoute } from "./Routes/roomInfoRoute";

const app = express();
export interface User {
  id: number;
  username: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
app.use(
  cors({
    // origin: [process.env.REACT_HOST!],
  })
);
app.use(express.urlencoded());
app.use(express.json());

//////////////////////////////////////////////////////////////////
app.use(userRoute);
app.use(uploadFileRoute);
app.use(roomInfoRoute);

const port = 8080;
app.listen(port, () => {
  console.log("__dirname:", __dirname + "/personal");

  console.log("Listening on port", port);
});
function formidable(arg0: {
  uploadDir: string;
  keepExtensions: boolean;
  maxFiles: number;
  maxFileSize: number; // the default limit is 200KB
  filter: (part: any) => any;
}) {
  throw new Error("Function not implemented.");
}
