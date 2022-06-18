import type { NextApiRequest, NextApiResponse } from "next";
import { Image } from "@prisma/client";
import formidable from "formidable";
import fs from "fs";
import AWS from "aws-sdk";

const s3Client = new AWS.S3({
  endpoint: process.env.NEXT_PUBLIC_ENDPOINT,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY,
    secretAccessKey: process.env.NEXT_PUBLIC_SECRET_KEY,
  },
  region: process.env.NEXT_PUBLIC_BUCKET_REGION,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return new Promise((resolve) => {
    switch (req.method) {
      case "POST":
        handlePost(req, res)
          .then(() => {
            resolve(res);
          })
          .catch((err) => {
            return res.status(400).json({
              error: err.message,
            });
          });
        break;
      default:
        res.status(400).json({
          error: "Method not allowed",
        });
        resolve(res);
    }
  });
}
async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (!files) {
      return res.status(400).json({
        error: "No file",
      });
    }
    // return res.status(201).json({msg: files});
    // try {
    //   for (let i=0; i<files.lenght; i++){
    //     await s3Client.putObject({
    //             Bucket: process.env.NEXT_PUBLIC_BUCKET,
    //             Key: files[i].demo.originalFilename,
    //             Body: fs.createReadStream(files[i].image.filepath),
    //             ACL: "public-read"
    //           }, async()=>res.status(201).json({message:"Uploaded"}))
    //   }
    // } catch (err) {
    //   return res.status(500).json({
    //           error: err.message
    //         });
    // }
    // const le = files.length;
    try {
      return s3Client.putObject({
            Bucket: process.env.NEXT_PUBLIC_BUCKET,
            Key: files.image.originalFilename,
            Body: fs.createReadStream(files.image.filepath),
            ACL: "public-read"
          }, async()=>res.status(201).json({message:files}));
        }
        catch (err) {
          return res.status(500).json({
            error: err.message
          });
      }
  });
}
