import type { NextApiRequest,NextApiResponse } from "next";
import prisma from "../../../components/prisma";
import { Project, CategoriesOnProject,LanguageOnProject,Image } from "@prisma/client";

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
  try{
    const data = req.body;
    const result = await prisma.project.create({
      data: {
        name: data.name,
        description: data.description,
        github: data.github,
        published: true 
        }
    });
    data.category.forEach(async (category) => {
      await prisma.categoriesOnProject.create({
        data: {
          project: {
            connect: {
              id: result.id
            }
          },
          category: {
            connect: {
              name: category
            }
          }
        }
      });
    }
    );
    data.language.forEach(async (language) => {
      await prisma.languageOnProject.create({
        data: {
          project: {
            connect: {
              id: result.id
            }
          },
          language: {
            connect: {
              name: language
            }
          }
        }
      });
    }
    );
    data.image.forEach(async (image) => {
      await prisma.image.create({
        data: {
          project: {
            connect: {
              id: result.id
            }
          },
          url: image.url,
          alt: image.alt
        }
      });
    }
    );
    return res.status(200).json(result);
  }
  catch(err){
    return res.status(400).json({
      error: err.message,
    });
  }
}