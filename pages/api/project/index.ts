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
  const option = req.query;
  const name = option.name? {name:true}:null;
  const published = option.published==="true"? {published:true}:null;
  const showcase = option.showcase? {showcase:true}:null;
  const result:Project[] = await prisma.project.findMany({
    where:{
      ...published,
      ...showcase,
    },
    include:{
      categories: {
        select: {
          category: true
        }
      },
      languages: {
        select: {
          language: true
        }
      },
      images: true,
    }
  });
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
        published: data.published,
        started: data.started,
        ended: data.ended,
        showcase:data.showcase, 
        categories: {
          create: data.categories.map(category => ({
              category: {
                connect: {
                  id: category.category.id
                }
              }}))
          },
        languages: {
          create: data.languages.map(language => ({
              language: {
                connect: {
                  id: language.language.id
                }
              }}))
        },
        images: {
          connectOrCreate: data.images.map(image=>({
            url: image.url,
            alt: image.alt
          }))
        }
      },
      include:{
        categories: {
          select: {
            category: true
          }
        },
        languages: {
          select: {
            language: true
          }
        },
        images: true
      }
    });

    return res.status(201).json(result);
  }
  catch(err){
    return res.status(400).json({
      error: err.message,
    });
  }
}