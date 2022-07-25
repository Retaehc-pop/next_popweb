import prisma from "../../../components/prisma";
import { Category } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  return new Promise((resolve) => {
    switch (req.method) {
      case "POST":
        handlePost(req, res)
          .then(() => {
            resolve(res);
          })
          .catch((err) => {
            return res.status(400).json({error: err.message,});
          });
        break;
      case "GET":
        handleGet(req, res)
          .then(() => {
            resolve(res);
          })
          .catch((err) => {
            return res.status(400).json({error: err.message,});
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
  try{
    const data =  req.body;
    const name:string = data.name;
    if(!name) throw new Error(data);
    const categoryData = await prisma.category.findUnique({
      where:{
        name:name,
      },
    });
    if (categoryData) return res.status(400).json({
      error:"Category already exists",
    })
    else{
      const result = await prisma.category.create({
        data:{
          name:name,
        },
      });
      return res.status(200).json(result);
    }
  }
  catch(err){
    return res.status(400).json({
      error: err.message,
    });
  }
}

async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  const result: Category[] = await prisma.category.findMany();
  return res.status(200).json(result);
}


