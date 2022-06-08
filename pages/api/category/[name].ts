import prisma from "../../../components/prisma";
import { Category, CategoriesOnProject, Project } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export async function handle(req: NextApiRequest, res: NextApiResponse) {
  return new Promise(resolve => {
    switch (req.method) {
      // case "DELETE":
      //   handleDelete(req, res).then(() => {
      //     resolve(res);
      //   }).catch(err => {
      //     return res.status(400).json({
      //       error: err.message
      //     })
      //   });
      //   break;
      case "GET":
        handleGet(req, res).then(() => {
          resolve(res);
        }).catch(err => {
          return res.status(400).json({
            error: err.message
          })
        });
        break;
      // case "PATCH":
      //   handlePatch(req, res).then(() => {
      //     resolve(res);
      //   }).catch(err => {
      //     return res.status(400).json({
      //       error: err.message
      //     })
      //   });
      //   break;
      default:
        res.status(400).json({
          error: "Method not allowed"
        });
        resolve(res);
    }
    }
  )
}


async function handleGet(req: NextApiRequest, res: NextApiResponse){
  const name = `${req.query.name}`;
  const result:Project[] = await prisma.project.findMany({
    where: {
      categories:{
        some:{
          categoryName: name
        },
      }
    },
  });
  return res.status(200).json(result);
}