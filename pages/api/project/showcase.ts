import type { NextApiRequest,NextApiResponse } from "next";
import prisma from "../../../components/prisma";
import { Project, CategoriesOnProject,LanguageOnProject,Image } from "@prisma/client";

export default async function handel(req:NextApiRequest,res:NextApiResponse){
  return new Promise(resolve => {
    switch(req.method){
      case "GET":
        handleGet(req,res).then(() => {
          resolve(res);
        }).catch(err => {
          return res.status(400).json({
            error: err.message
            })
            }
        );
        break;
      default:
        res.status(400).json({
          error:"Method not allowed"
        });
        resolve(res);
    }
    }
  )
}

async function handleGet(req:NextApiRequest,res:NextApiResponse){
  const result:Project[] = await prisma.project.findMany({
    where:{
      showcase:true,
    },
    include:{
      categories: true,
      languages: true,
      images: true,
    }
  });
  return res.status(200).json(result)
}