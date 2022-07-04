import prisma from "../../../components/prisma";
import { Project } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handle(req:NextApiRequest,res:NextApiResponse){
  return new Promise(resolve => {
    switch(req.method){
      case "DELETE":
        handleDelete(req,res).then(() => {
          resolve(res);
        }).catch(err => {
          return res.status(400).json({
            error: err.message
            })
            });
        break;
      case "GET":
        handleGet(req,res).then(() => {
          resolve(res);
        }).catch(err => {
          return res.status(400).json({
            error: err.message
            })
            });
        break;
      // case "PUT":
      //   handlePut(req,res).then(() => {
      //     resolve(res);
      //   }).catch(err => {
      //     return res.status(400).json({
      //       error: err.message
      //       })
      //       });
      //   break;
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
  const name = `${req.query.name}`;
  const result:Project = await prisma.project.findUnique({
    where:{
      name:name
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

// async function handlePut(req:NextApiRequest,res:NextApiResponse){
//   const name = `${req.query.name}`;
//   const data = req.body;
  
//   const result = await prisma.project.update({
//     where:{
//       name:name
//     },
//     data:{
//       name:data.name,
//       description:data.description,
//       github:data.github,
//       published:data.published,
//       started: data.started,
//       ended: data.ended,
//       showcase:data.showcase,
//       // categories:{
//       //   upsert: data.categories.map(category => ({
//       //     category: category.category,
//       //     createdAt: new Date(),
//       //     updatedAt: new Date()
//       //   }))
//       // }
//     }
//   });
//   return res.status(200).json(result);
// }

async function handleDelete(req:NextApiRequest,res:NextApiResponse){
  const name = `${req.query.name}`;
  const original = await prisma.project.findUnique({
    where:{
      name:name
    },
  })
  const cat = await prisma.categoriesOnProject.deleteMany({
    where:{
      project:{
        id:original.id
      }
    }
  })
  const lang = await prisma.languageOnProject.deleteMany({
    where:{
      project:{
        id:original.id
      }
    }
  })
  const img = await prisma.image.deleteMany({
    where:{
      project:{
        id:original.id
      }
    }
  })
  const result = await prisma.project.delete({
    where:{
      name:name
    }
  })
  return res.status(200).json(result);
}