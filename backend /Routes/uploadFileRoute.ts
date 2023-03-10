import fs from "fs";
import formidable from "formidable";
import express from "express";
//////////////////////upload file ///////////////////////////

// export let uploadFileRoute = express.Router();

const uploadDir = "uploads";
fs.mkdirSync(uploadDir, { recursive: true });

export const form = formidable({
  uploadDir,
  keepExtensions: true,
  maxFiles: 1,
  maxFileSize: 2000 * 1024 ** 2, // the default limit is 200KB
  filter: (part: any) => part.mimetype?.startsWith("image/") || false,
  filename: (originalName, originalExt, part, form) => {
    let fieldName = part.name;
    let timestamp = Date.now();
    let ext = part.mimetype?.split("/").pop();
    return `${fieldName}-${timestamp}.${ext}`;
  },
});

// uploadFileRoute.post("/form", async (req, res) => {
//   form.parse(req, (err: any, fields: any, files: any) => {
//     // console.log({ err, fields, files });
//     res.redirect("/");
//   });
// });
