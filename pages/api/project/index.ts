import type { NextApiHandler,NextApiRequest,NextApiResponse } from "next";
import prisma from "../../../components/prisma";
import { Project } from "@prisma/client";

export default async function handle(req:NextApiRequest,res:NextApiResponse){
  return new Promise(resolve => {
    switch(req.method){
      case "POST":
        handlePost(req,res).then(() => {
          resolve(res);
        }).catch(err => {
          return res.status(400).json({
            error: err.message
            })
            }
        );
        break;
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
  const result:Project[] = await prisma.project.findMany();
  return res.status(200).json(result);
}

async function handlePost(req:NextApiRequest,res:NextApiResponse){
  const data = await req.body();
  const result = await prisma.project.create({
    data: {
      name: data.name,
      description: data.description,
      github: data.github,
      published: true,
      images:{
        create: data.images.map(image => ({
          publicId: image.publicId,
          format: image.format,
          version: image.version,
          project:{
            connect:{
              name:data.name
            }
          }
        }))   
      },
      categories: {
        create: data.categories.map((category:string) => {
          category: {
            connect: {
              name: category
            }
          }
          project:{
            connect:{
              name: data.name
            }
          }
        }),
      },
      language:{
        create: data.language.map((language:string) => {
          language: {
            connect: {
              name: language
            }
          }
          project:{
            connect:{
              name: data.name
            }
          }
        }),
      }
    }
  
  })
}
