import prisma from "../../../components/prisma";
import { Category } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

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
      case "GET":
        handleGet(req, res)
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
async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  const result: Category[] = await prisma.category.findMany();
  return res.status(200).json(result);
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  const data = await req.body();
  const categories = await prisma.category.findMany();
  if (categories.find((category) => category.name === data.name)) {
    return res.status(400).json({
      error: "Category already exists",
    });
  } 
  
  const result = await prisma.category.create({
    data: {
      name: data.name,
    },
  });
  return res.status(200).json(result);
}
